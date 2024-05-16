import { Inject } from '@nestjs/common';
import { Prisma, StatusCustomerAccount, TypeAccount } from '@prisma/client';
import { PrismaService } from 'libs/database.module';
import { AccountModel } from '../domain/account.model';
import { AccountFactory } from './account.factory';

export class AccountRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly accountFactory: AccountFactory;

  async create(account: AccountModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, employee, customer, customerUUID, employeeUUID, ...data } =
      account;
    if (account.type !== TypeAccount.CUSTOMER) {
      await this.prisma.account.create({ data });
      await this.prisma.employee.create({
        data: { ...employee, account: { connect: { uuid: account.uuid } } },
      });
    } else {
      await this.prisma.account.create({
        data: {
          ...data,
          customer: { connect: { uuid: account.customerUUID } },
        },
      });
      await this.prisma.customer.update({
        where: { uuid: account.customerUUID },
        data: { hasAccount: StatusCustomerAccount.APPROVED },
      });
    }
    return account.uuid;
  }

  async rejectAccountForCustomer(
    customerUUID: string,
    tenantId: string,
  ): Promise<string> {
    const customer = await this.prisma.customer.update({
      where: { uuid: customerUUID, tenantId },
      data: { hasAccount: StatusCustomerAccount.NOTAPPROVED },
    });
    return customer.uuid;
  }

  async update(account: AccountModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, employee, customer, ...data } = account;
    await this.prisma.account.update({ data, where: { uuid } });
    await this.prisma.employee.update({
      data: {
        ...employee,
      },
      where: { uuid: employee.uuid },
    });
    return uuid;
  }

  async delete(models: AccountModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.account.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string, tenantId: string): Promise<AccountModel> {
    const entity = await this.prisma.account.findUnique({
      where: { uuid, tenantId },
      include: { employee: true },
    });
    return this.accountFactory.createAccountModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<AccountModel[]> {
    const entities = await this.prisma.account.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
      include: { employee: true },
    });
    return this.accountFactory.createAccountModels(entities);
  }

  async getCustomerByUUID(
    uuid: string,
    tenantId: string,
  ): Promise<
    Prisma.CustomerGetPayload<{ include: { individual: true; business: true } }>
  > {
    const entity = await this.prisma.customer.findUnique({
      where: { uuid, tenantId },
      include: { individual: true, business: true },
    });
    return entity;
  }

  async count(): Promise<number> {
    return await this.prisma.account.count();
  }
}
