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
    const { business, individual, ...dataCus } = customer;
    await this.prisma.customer.create({ data: dataCus });
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

  async update(customer: CustomerModel): Promise<string> {
    const { uuid, business, individual, ...dataCus } = customer;
    await this.prisma.customer.update({ data: dataCus, where: { uuid } });
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
    models.forEach(async (model) => {
      if (model.isBusiness) {
        await this.prisma.business.delete({ where: { id: model.business.id } });
      } else {
        await this.prisma.individual.delete({
          where: { id: model.individual.id },
        });
      }
    });
    await this.prisma.customer.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string): Promise<CustomerModel> {
    const entity = await this.prisma.customer.findUnique({
      where: { uuid },
      include: { business: true, individual: true },
    });
    return this.customerFactory.createCustomerModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<CustomerModel[]> {
    const entities = await this.prisma.customer.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
      include: { business: true, individual: true },
    });
    return this.customerFactory.createCustomerModels(entities);
  }

  async count(): Promise<number> {
    return await this.prisma.customer.count();
  }
}
