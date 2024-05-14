import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import {
  ActivityComplaintModel,
  ComplaintModel,
  HistoryStatusComplaintType,
  TypeComplaintModel,
} from '../domain/complaint.model';
import { ComplaintFactory } from './complaint.factory';

export class ComplaintRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly complaintFactory: ComplaintFactory;

  async createComplaint(complaint: ComplaintModel): Promise<string> {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id,
      customerUUID,
      typeComplaintUUID,
      employees,
      valueFieldComplaint,
      billUUID,
      listStatus,
      ...dataComplaint
    } = complaint;
    if (!billUUID) {
      const newComplaint = await this.prisma.complaint.create({
        data: {
          ...dataComplaint,
          customer: { connect: { uuid: customerUUID } },
          typeComplaint: { connect: { uuid: typeComplaintUUID } },
          employees: { connect: employees },
          valueFieldComplaint: { createMany: { data: valueFieldComplaint } },
          listStatus: { createMany: { data: listStatus } },
        },
      });
      return newComplaint.uuid;
    }
    const newComplaint = await this.prisma.complaint.create({
      data: {
        ...dataComplaint,
        customer: { connect: { uuid: customerUUID } },
        typeComplaint: { connect: { uuid: typeComplaintUUID } },
        employees: { connect: employees },
        valueFieldComplaint: { createMany: { data: valueFieldComplaint } },
        bill: { connect: { uuid: billUUID } },
        listStatus: { createMany: { data: listStatus } },
      },
    });
    return newComplaint.uuid;
  }

  async createTypeComplaint(
    typeComplaint: TypeComplaintModel,
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, listOfField, complaints, ...dataTypeComplaint } = typeComplaint;
    const newTypeComplaint = await this.prisma.typeComplaint.create({
      data: {
        ...dataTypeComplaint,
        listOfField: { createMany: { data: listOfField } },
      },
    });
    return newTypeComplaint.uuid;
  }

  async createActivityComplaint(
    activityComplaint: ActivityComplaintModel,
  ): Promise<string> {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id,
      employeeUUID,
      activityUUID,
      complaintUUID,
      ...dataActivityComplaint
    } = activityComplaint;
    const newActivityComplaint = await this.prisma.activityComplaint.create({
      data: {
        ...dataActivityComplaint,
        employee: { connect: { uuid: employeeUUID } },
        activity: { connect: { uuid: activityUUID } },
        complaint: { connect: { uuid: complaintUUID } },
      },
    });
    return newActivityComplaint.uuid;
  }

  async updateStatusComplaint(
    model: ComplaintModel,
    historyStatusComplaint: HistoryStatusComplaintType,
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, complaintUUID, ...dataStatus } = historyStatusComplaint;
    await this.prisma.historyStatusComplaint.create({
      data: {
        ...dataStatus,
        complaint: { connect: { uuid: model.uuid } },
      },
    });
    return model.uuid;
  }

  async updateTypeComplaint(model: TypeComplaintModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, listOfField, complaints, ...dataTypeComplaint } = model;
    const listField = listOfField.map((field) => {
      delete field.id;
      delete field.typeComplaintUUID;
      return field;
    });
    await this.prisma.typeComplaint.update({
      data: {
        ...dataTypeComplaint,
        listOfField: {
          update: listField.map((field) => {
            return { data: field, where: { uuid: field.uuid } };
          }),
        },
      },
      where: { uuid: model.uuid },
    });
    return model.uuid;
  }

  async deleteComplaint(models: ComplaintModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.complaint.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async deleteTypeComplaint(models: TypeComplaintModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.typeComplaint.deleteMany({
      where: { uuid: { in: uuids } },
    });
    return uuids;
  }

  async deleteActivityComplaint(
    models: ActivityComplaintModel[],
  ): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.activityComplaint.deleteMany({
      where: { uuid: { in: uuids } },
    });
    return uuids;
  }

  async getComplaintByUUIDs(
    uuids: string[] | string,
    tenantId: string,
  ): Promise<ComplaintModel[]> {
    const entities = await this.prisma.complaint.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] }, tenantId },
      include: { employees: true, valueFieldComplaint: true },
    });
    return this.complaintFactory.createComplaintModels(entities);
  }

  async getTypeComplaintByUUIDs(
    uuids: string[] | string,
    tenantId: string,
  ): Promise<TypeComplaintModel[]> {
    const entities = await this.prisma.typeComplaint.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] }, tenantId },
      include: { complaints: true, listOfField: true },
    });
    return this.complaintFactory.createTypeComplaintModels(entities);
  }

  async getActivityComplaintUUIDs(
    uuids: string[] | string,
    tenantId: string,
  ): Promise<ActivityComplaintModel[]> {
    const entities = await this.prisma.activityComplaint.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] }, tenantId },
      include: { employee: true, activity: true, complaint: true },
    });
    return this.complaintFactory.createActivityComplaintModels(entities);
  }
}
