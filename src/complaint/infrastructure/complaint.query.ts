import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { FirebaseService } from 'libs/firebase.module';
import { UtilityImplement } from 'libs/utility.module';
import { GetActivitiesComplaintItem } from '../application/query/result/get.activities.complaint.query.result';
import {
  ComplaintItem,
  GetComplaintsResult,
} from '../application/query/result/get.complaints.query.result';
import {
  GetSelectorTypeItem,
  GetSelectorTypeResult,
} from '../application/query/result/get.selector.type.query.result';
import {
  Field,
  ReadComplaintResult,
  ValueField,
} from '../application/query/result/read.complaint.query.result';
import { ReadTypeComplaintResult } from '../application/query/result/read.typeComplaint.query.result';
import { TypeComplaintModel } from '../domain/complaint.model';

export class ComplaintQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;
  @Inject()
  private readonly firebase: FirebaseService;

  async getComplaints(
    tenantId: string,
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetComplaintsResult> {
    const conditions = [];
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        if (item.isCustom) {
          if (prop === 'customerName') {
            const { value } = this.util.buildSearch(item);
            conditions.push({
              customer: {
                OR: [
                  { business: { name: value } },
                  { individual: { name: value } },
                ],
              },
            });
          }
          if (prop === 'customerCode') {
            const { value } = this.util.buildSearch(item);
            conditions.push({ customer: { code: value } });
          }
          if (prop === 'typeComplaintName') {
            const { value } = this.util.buildSearch(item);
            conditions.push({ typeComplaint: { name: value } });
          }
          if (prop === 'employeeName') {
            const { value } = this.util.buildSearch(item);
            conditions.push({ employee: { some: { name: value } } });
          }
        } else {
          const { value } = this.util.buildSearch(item);
          obj[prop] = value;
          conditions.push(obj);
        }
      }
    }
    conditions.push({ tenantId });
    const [data, total] = await Promise.all([
      this.prisma.complaint.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        include: {
          customer: { include: { business: true, individual: true } },
          typeComplaint: true,
          employees: true,
        },
      }),
      this.prisma.complaint.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((i) => {
        return plainToClass(
          ComplaintItem,
          {
            ...i,
            customerName: i.customer.isBusiness
              ? i.customer.business.name
              : i.customer.individual.name,
            customerCode: i.customer.code,
            typeComplaintName: i.typeComplaint.name,
            employeeName: i.employees.map((e) => e.name),
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async getSelectorType(tenantId: string): Promise<GetSelectorTypeResult> {
    const data = await this.prisma.typeComplaint.findMany({
      where: { tenantId },
    });
    return {
      item: data.map((i) => {
        return plainToClass(GetSelectorTypeItem, i, {
          excludeExtraneousValues: true,
        });
      }),
    };
  }

  async getTypeComplaintListForCheck(tenantId: string): Promise<string[]> {
    const data = await this.prisma.typeComplaint.findMany({
      where: { tenantId },
    });
    return data ? data.map((i) => i.name) : [];
  }

  async readComplaint(
    uuid: string,
    tenantId: string,
  ): Promise<ReadComplaintResult> {
    const data = await this.prisma.complaint.findUnique({
      where: { uuid, tenantId },
      include: {
        customer: { include: { business: true, individual: true } },
        typeComplaint: { include: { listOfField: true } },
        valueFieldComplaint: true,
      },
    });
    const fieldComplaintUUIDs = data.typeComplaint.listOfField.map(
      (field) => field.uuid,
    );
    const valueFieldComplaint: ValueField[] = [];
    for (const field of data.valueFieldComplaint) {
      const index = fieldComplaintUUIDs.indexOf(field.fieldComplaintUUID);
      const fieldComplaint = data.typeComplaint.listOfField[index];
      if (fieldComplaint.isFieldFile) {
        const urls: string[] = [];
        for (const i of field.value) {
          urls.push(await this.firebase.getAuthenticatedFileUrl(i));
        }
        valueFieldComplaint.push({
          fieldComplaintUUID: field.complaintUUID,
          value: urls,
        });
      } else {
        valueFieldComplaint.push({
          fieldComplaintUUID: field.complaintUUID,
          value: field.value,
        });
      }
    }
    return plainToClass(
      ReadComplaintResult,
      {
        ...data,
        listOfField: data.typeComplaint.listOfField.map((field) =>
          plainToClass(Field, field, { excludeExtraneousValues: true }),
        ),
        valueFieldComplaint,
        customerUUID: data.customer.uuid,
        isBusiness: data.customer.isBusiness,
        customerName: data.customer.isBusiness
          ? data.customer.business.name
          : data.customer.individual.name,
        customerCCCD: data.customer.isBusiness
          ? data.customer.business.representativeCccd
          : data.customer.individual.cccd,
        customerPhoneNumber: data.customer.isBusiness
          ? data.customer.business.representativePhone
          : data.customer.individual.phoneNumber,
        customerEmail: data.customer.isBusiness
          ? data.customer.business.representativeEmail
          : data.customer.individual.email,
      },
      { excludeExtraneousValues: true },
    );
  }

  async readTypeComplaint(
    uuid: string,
    tenantId: string,
  ): Promise<ReadTypeComplaintResult> {
    const data = await this.prisma.typeComplaint.findUnique({
      where: { uuid, tenantId },
      include: {
        listOfField: true,
        _count: {
          select: {
            complaints: true,
          },
        },
      },
    });
    return plainToClass(
      ReadTypeComplaintResult,
      {
        ...data,
        numOfComplaints: data._count.complaints,
        listOfField: data.listOfField.map((field) =>
          plainToClass(Field, field, { excludeExtraneousValues: true }),
        ),
      },
      { excludeExtraneousValues: true },
    );
  }

  async getListEmployees(customerUUID: string) {
    const data = await this.prisma.customer.findUnique({
      where: { uuid: customerUUID },
      include: { employees: true },
    });
    return data.employees.map((employee) => ({
      uuid: employee.uuid,
      name: employee.name,
      code: employee.code,
    }));
  }

  async getTypeComplaint(
    uuid: string,
    tenantId: string,
  ): Promise<TypeComplaintModel> {
    const data = await this.prisma.typeComplaint.findUnique({
      where: { uuid, tenantId },
      include: { listOfField: true },
    });
    return plainToClass(TypeComplaintModel, data, {
      excludeExtraneousValues: true,
    });
  }

  async getActivtiesComplaint(complaintUUID: string, tenantId: string) {
    const data = await this.prisma.complaint.findUnique({
      where: { uuid: complaintUUID, tenantId },
      include: {
        activityComplaint: { include: { employee: true, activity: true } },
      },
    });
    return {
      items: data.activityComplaint.map((i) =>
        plainToClass(GetActivitiesComplaintItem, {
          ...i,
          employeeName: i.employee.name,
          employeeCode: i.employee.code,
          activityName: i.activity.name,
        }),
      ),
    };
  }

  async getAccountForEmployee(
    employeeUUIDs: string[],
  ): Promise<{ accountUUID: string; token: string }[]> {
    const data = await this.prisma.employee.findMany({
      where: { uuid: { in: employeeUUIDs } },
      include: { account: true },
    });
    const result: { accountUUID: string; token: string }[] = [];
    data.map((i) => {
      if (i.account.accessToken) {
        result.push({
          accountUUID: i.account.uuid,
          token: i.account.accessToken,
        });
      }
    });
    return result;
  }
}
