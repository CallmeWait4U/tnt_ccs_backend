import { Inject } from '@nestjs/common';
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
    const { id, employee, customer, ...data } = account;
    await this.prisma.account.create({ data });
    await this.prisma.employee.create({
      data: { ...employee, account: { connect: { uuid: account.uuid } } },
    });
    return account.uuid;
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

  async getByUUID(uuid: string): Promise<AccountModel> {
    const entity = await this.prisma.account.findUnique({
      where: { uuid },
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

  async count(): Promise<number> {
    return await this.prisma.account.count();
  }
}
