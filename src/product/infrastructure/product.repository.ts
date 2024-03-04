import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { ProductModel } from '../domain/product.model';
import { ProductFactory } from './product.factory';

export class ProductRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly accountFactory: ProductFactory;

  async create(account: ProductModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { employee, customer, ...data } = account;
    await this.prisma.account.create({ data });
    await this.prisma.employee.create({
      data: { ...employee, account: { connect: { uuid: account.uuid } } },
    });
    return account.uuid;
  }

  async update(account: ProductModel): Promise<string> {
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

  async delete(models: ProductModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.account.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string): Promise<ProductModel> {
    const entity = await this.prisma.account.findUnique({
      where: { uuid },
      include: { employee: true },
    });
    return this.accountFactory.createProductModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<ProductModel[]> {
    const entities = await this.prisma.account.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
      include: { employee: true },
    });
    return this.accountFactory.createProductModels(entities);
  }

  async count(): Promise<number> {
    return await this.prisma.account.count();
  }
}
