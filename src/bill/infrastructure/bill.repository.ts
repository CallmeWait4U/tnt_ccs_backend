import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { BillModel } from '../domain/bill.model';
import { BillFactory } from './bill.factory';

export class BillRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly billFactory: BillFactory;

  async create(bill: BillModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customerUUID, products, priceQuoteUUID, ...data } = bill;
    if (priceQuoteUUID) {
      await this.prisma.bill.create({
        data: {
          ...data,
          customer: {
            connect: { uuid: customerUUID },
          },
          priceQuote: {
            connect: { uuid: priceQuoteUUID },
          },
        },
      });
    } else {
      await this.prisma.bill.create({
        data: {
          ...data,
          customer: {
            connect: {
              uuid: customerUUID,
            },
          },
        },
      });
    }

    if (products.length > 0) {
      await Promise.all(
        products.map(async (item) => {
          const { uuid, ...data } = item;
          await this.prisma.productBill.create({
            data: {
              ...data,
              product: {
                connect: {
                  uuid: item.uuid,
                },
              },
              bill: {
                connect: {
                  uuid: bill.uuid,
                },
              },
            },
          });
        }),
      );
    }

    return bill.uuid;
  }

  async update(bill: BillModel): Promise<string> {
    const { uuid, products, ...data } = bill;
    await this.prisma.bill.update({ data, where: { uuid } });

    await this.prisma.productBill.deleteMany({
      where: {
        productUUID: { notIn: products.map((item) => item.uuid) },
      },
    });
    if (products.length > 0) {
      const listProductBill = await this.prisma.productBill.findMany({
        select: { productUUID: true },
        where: { billUUID: uuid },
      });
      const listProductCurrentUUIDS = listProductBill.map(
        (item) => item.productUUID,
      );
      await Promise.all(
        products.map(async (item) => {
          if (item.uuid)
            if (!listProductCurrentUUIDS.includes(item.uuid)) {
              const { uuid, ...data } = item;
              await this.prisma.productBill.create({
                data: {
                  ...data,
                  product: {
                    connect: {
                      uuid: item.uuid,
                    },
                  },
                  bill: {
                    connect: {
                      uuid: bill.uuid,
                    },
                  },
                },
              });
            } else {
              const currentProductBill =
                await this.prisma.productBill.findFirst({
                  where: {
                    productUUID: item.uuid,
                    billUUID: bill.uuid,
                  },
                });
              if (currentProductBill?.id) {
                const { uuid, ...dataUpdate } = item;
                await this.prisma.productBill.update({
                  data: {
                    ...dataUpdate,
                  },
                  where: {
                    id: currentProductBill.id,
                  },
                });
              }
            }
        }),
      );
    }

    return uuid;
  }

  async delete(models: BillModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.productBill.deleteMany({
      where: { billUUID: { in: uuids } },
    });
    await this.prisma.bill.deleteMany({ where: { uuid: { in: uuids } } });

    return uuids;
  }

  async getByUUID(uuid: string): Promise<BillModel> {
    const entity = await this.prisma.bill.findUnique({
      where: { uuid },
    });
    return this.billFactory.createBillModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<BillModel[]> {
    const entities = await this.prisma.bill.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
    });
    return this.billFactory.createBillModels(entities);
  }

  async count(): Promise<number> {
    return await this.prisma.bill.count();
  }
}
