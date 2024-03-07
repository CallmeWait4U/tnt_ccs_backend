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
    const { customerUUID, products, ...data } = priceQuote;
    await this.prisma.priceQuote.create({
      data: {
        ...data,
        customer: {
          connect: {
            uuid: customerUUID,
          },
        },
      },
    });

    if (products.length > 0) {
      await Promise.all(
        products.map(async (item) => {
          const { uuid, ...data } = item;
          await this.prisma.productPriceQuote.create({
            data: {
              ...data,
              product: {
                connect: {
                  uuid: item.uuid,
                },
              },
              priceQuote: {
                connect: {
                  uuid: priceQuote.uuid,
                },
              },
            },
          });
        }),
      );
    }

    return priceQuote.uuid;
  }

  async update(priceQuote: PriceQuoteModel): Promise<string> {
    const { uuid, products, ...data } = priceQuote;
    await this.prisma.priceQuote.update({ data, where: { uuid } });

    await this.prisma.productPriceQuote.deleteMany({
      where: {
        productUUID: { notIn: products.map((item) => item.uuid) },
      },
    });
    if (products.length > 0) {
      const listProductPriceQuote =
        await this.prisma.productPriceQuote.findMany({
          select: { productUUID: true },
          where: { priceQuoteUUID: uuid },
        });
      const listProductCurrentUUIDS = listProductPriceQuote.map(
        (item) => item.productUUID,
      );
      await Promise.all(
        products.map(async (item) => {
          if (item.uuid)
            if (!listProductCurrentUUIDS.includes(item.uuid)) {
              const { uuid, ...data } = item;
              await this.prisma.productPriceQuote.create({
                data: {
                  ...data,
                  product: {
                    connect: {
                      uuid: item.uuid,
                    },
                  },
                  priceQuote: {
                    connect: {
                      uuid: priceQuote.uuid,
                    },
                  },
                },
              });
            } else {
              const currentProduct =
                await this.prisma.productPriceQuote.findFirst({
                  where: {
                    productUUID: item.uuid,
                    priceQuoteUUID: priceQuote.uuid,
                  },
                });
              if (currentProduct?.id) {
                const { uuid, ...dataUpdate } = item;
                await this.prisma.productPriceQuote.update({
                  data: { ...dataUpdate },
                  where: { id: currentProduct.id },
                });
              }
            }
        }),
      );
    }

    return uuid;
  }

  async delete(models: PriceQuoteModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.productPriceQuote.deleteMany({
      where: { priceQuoteUUID: { in: uuids } },
    });
    await this.prisma.priceQuote.deleteMany({ where: { uuid: { in: uuids } } });

    return uuids;
  }

  async getByUUID(uuid: string): Promise<PriceQuoteModel> {
    const entity = await this.prisma.priceQuote.findUnique({
      where: { uuid },
    });
    return this.priceQuoteFactory.createPriceQuoteModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<PriceQuoteModel[]> {
    const entities = await this.prisma.priceQuote.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
    });
    return this.priceQuoteFactory.createPriceQuoteModels(entities);
  }

  async count(): Promise<number> {
    return await this.prisma.priceQuote.count();
  }
}
