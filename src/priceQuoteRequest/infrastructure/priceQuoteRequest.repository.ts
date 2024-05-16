import { Inject } from '@nestjs/common';
import { Customer, StatusPriceQuoteRequest } from '@prisma/client';
import { PrismaService } from 'libs/database.module';
import { PriceQuoteRequestModel } from '../domain/priceQuoteRequest.model';
import { PriceQuoteRequestFactory } from './priceQuoteRequest.factory';

export class PriceQuoteRequestRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly priceQuoteRequestFactory: PriceQuoteRequestFactory;

  async create(priceQuoteRequest: PriceQuoteRequestModel): Promise<any> {
    const { customerUUID, products, ...data } = priceQuoteRequest;
    await this.prisma.priceQuoteRequest.create({
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { uuid, ...data } = item;
          await this.prisma.productPriceQuoteRequest.create({
            data: {
              ...data,
              product: {
                connect: {
                  uuid: item.uuid,
                },
              },
              priceQuoteRequest: {
                connect: {
                  uuid: priceQuoteRequest.uuid,
                },
              },
            },
          });
        }),
      );
    }

    return priceQuoteRequest.uuid;
  }

  async update(priceQuoteRequest: PriceQuoteRequestModel): Promise<any> {
    const { uuid, products, ...data } = priceQuoteRequest;
    await this.prisma.priceQuoteRequest.update({ data, where: { uuid } });

    await this.prisma.productPriceQuoteRequest.deleteMany({
      where: {
        productUUID: { notIn: products.map((item) => item.uuid) },
      },
    });
    if (products.length > 0) {
      const listProductPriceQuoteRequest =
        await this.prisma.productPriceQuoteRequest.findMany({
          select: { productUUID: true },
          where: { priceQuoteRequestUUID: uuid },
        });
      const listProductCurrentUUIDS = listProductPriceQuoteRequest.map(
        (item) => item.productUUID,
      );
      await Promise.all(
        products.map(async (item) => {
          if (item.uuid)
            if (!listProductCurrentUUIDS.includes(item.uuid)) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { uuid, ...data } = item;
              await this.prisma.productPriceQuoteRequest.create({
                data: {
                  ...data,
                  product: {
                    connect: {
                      uuid: item.uuid,
                    },
                  },
                  priceQuoteRequest: {
                    connect: {
                      uuid: priceQuoteRequest.uuid,
                    },
                  },
                },
              });
            } else {
              const currentProduct =
                await this.prisma.productPriceQuoteRequest.findFirst({
                  where: {
                    priceQuoteRequestUUID: uuid,
                    productUUID: item.uuid,
                  },
                });
              if (currentProduct?.id) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { uuid, ...dataUpdate } = item;
                await this.prisma.productPriceQuoteRequest.update({
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

  async updateStatus(uuid: string, tenantId: string): Promise<void> {
    await this.prisma.priceQuoteRequest.update({
      where: { uuid, tenantId },
      data: { status: StatusPriceQuoteRequest.SENT },
    });
  }

  async delete(models: PriceQuoteRequestModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.productPriceQuoteRequest.deleteMany({
      where: { priceQuoteRequestUUID: { in: uuids } },
    });
    await this.prisma.priceQuoteRequest.deleteMany({
      where: { uuid: { in: uuids } },
    });

    return uuids;
  }

  async getByUUID(uuid: string): Promise<PriceQuoteRequestModel> {
    const entity = await this.prisma.priceQuoteRequest.findUnique({
      where: { uuid },
    });
    return this.priceQuoteRequestFactory.createPriceQuoteRequestModel(entity);
  }

  async getByUUIDs(
    uuids: string[] | string,
  ): Promise<PriceQuoteRequestModel[]> {
    const entities = await this.prisma.priceQuoteRequest.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
    });
    return this.priceQuoteRequestFactory.createPriceQuoteRequestModels(
      entities,
    );
  }

  async getCustomerByAccount(
    uuid: string,
    tenantId: string,
  ): Promise<Customer> {
    const data = await this.prisma.account.findUnique({
      where: { uuid, tenantId },
      include: { customer: true },
    });
    return data.customer;
  }
}
