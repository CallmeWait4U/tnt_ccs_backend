import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { CustomerModel } from '../domain/customer.model';
import { CustomerFactory } from './customer.factory';

export class CustomerRespository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly customerFactory: CustomerFactory;

  async create(customer: CustomerModel): Promise<string> {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id,
      business,
      individual,
      phaseUUID,
      employees,
      phasesCustomer,
      ...dataCus
    } = customer;
    await this.prisma.customer.create({
      data: {
        ...dataCus,
        phase: { connect: { uuid: phaseUUID } },
        employees: {
          connect: employees,
        },
        phasesCustomer: { create: phasesCustomer },
      },
    });
    if (customer.isBusiness) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...dataBusiness } = business;
      await this.prisma.business.create({
        data: {
          ...dataBusiness,
          customer: { connect: { uuid: customer.uuid } },
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...dataIndividual } = individual;
      await this.prisma.individual.create({
        data: {
          ...dataIndividual,
          customer: { connect: { uuid: customer.uuid } },
        },
      });
    }
    return customer.uuid;
  }

  async update(customer: CustomerModel, updatePhase: boolean): Promise<string> {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id,
      uuid,
      business,
      individual,
      employees,
      phaseUUID,
      phasesCustomer,
      ...dataCus
    } = customer;
    if (updatePhase === true) {
      await this.prisma.customer.update({
        data: {
          ...dataCus,
          employees: { connect: employees },
          phase: { connect: { uuid: phaseUUID } },
        },
        where: { uuid },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, customerUUID, ...dataPhasesCustomer } =
        phasesCustomer[phasesCustomer.length - 1];
      await this.prisma.phasesCustomer.create({
        data: { ...dataPhasesCustomer, customer: { connect: { uuid } } },
      });
    } else {
      await this.prisma.customer.update({
        data: { ...dataCus, employees: { connect: employees } },
        where: { uuid },
      });
    }
    if (customer.isBusiness) {
      const { id, ...dataBusiness } = business;
      await this.prisma.business.update({
        data: {
          ...dataBusiness,
        },
        where: { id },
      });
    } else {
      const { id, ...dataIndividual } = individual;
      await this.prisma.individual.update({
        data: {
          ...dataIndividual,
        },
        where: { id },
      });
    }
    return uuid;
  }

  async delete(models: CustomerModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.phasesCustomer.deleteMany({
      where: { customerUUID: { in: uuids } },
    });
    await this.prisma.customer.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string, tenantId: string): Promise<CustomerModel> {
    const entity = await this.prisma.customer.findUnique({
      where: { uuid, tenantId },
      include: { business: true, individual: true, phasesCustomer: true },
    });
    return this.customerFactory.createCustomerModel(entity);
  }

  async getByUUIDs(
    uuids: string[] | string,
    tenantId: string,
  ): Promise<CustomerModel[]> {
    const entities = await this.prisma.customer.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] }, tenantId },
      include: { business: true, individual: true },
    });
    return this.customerFactory.createCustomerModels(entities);
  }
}
