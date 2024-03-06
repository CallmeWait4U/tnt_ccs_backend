import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { PriceQuoteModel } from '../domain/priceQuote.model';
import { PriceQuoteFactory } from './priceQuote.factory';

export class PriceQuoteRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly priceQuoteFactory: PriceQuoteFactory;

  async create(priceQuote: PriceQuoteModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { employee, customer, ...data } = priceQuote;
    await this.prisma.priceQuote.create({ data });
    await this.prisma.employee.create({
      data: { ...employee, priceQuote: { connect: { uuid: priceQuote.uuid } } },
    });
    return priceQuote.uuid;
  }

  async update(priceQuote: PriceQuoteModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, employee, customer, ...data } = priceQuote;
    await this.prisma.priceQuote.update({ data, where: { uuid } });
    await this.prisma.employee.update({
      data: {
        ...employee,
      },
      where: { uuid: employee.uuid },
    });
    return uuid;
  }

  async delete(models: PriceQuoteModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.priceQuote.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string): Promise<PriceQuoteModel> {
    const entity = await this.prisma.priceQuote.findUnique({
      where: { uuid },
      include: { employee: true },
    });
    return this.priceQuoteFactory.createPriceQuoteModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<PriceQuoteModel[]> {
    const entities = await this.prisma.priceQuote.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
      include: { employee: true },
    });
    return this.priceQuoteFactory.createPriceQuoteModels(entities);
  }

  async count(): Promise<number> {
    return await this.prisma.priceQuote.count();
  }
}
