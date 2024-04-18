import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetPriceQuoteRequestsResult,
  PriceQuoteRequestItem,
} from '../application/query/result/list.priceQuoteRequest.query.result';
import {
  ProductItemOfPriceQuoteRequestResult,
  ReadPriceQuoteRequestResult,
} from '../application/query/result/read.priceQuoteRequest.query.result';

export class PriceQuoteRequestQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getPriceQuoteRequests(
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetPriceQuoteRequestsResult> {
    const conditions = [];
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        const { value } = this.util.buildSearch(item);
        obj[prop] = value;
        conditions.push(obj);
      }
    }
    const [data, total] = await Promise.all([
      this.prisma.priceQuoteRequest.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.priceQuoteRequest.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((i) => {
        return plainToClass(
          PriceQuoteRequestItem,
          {
            ...i,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readPriceQuoteRequest(
    uuid: string,
  ): Promise<ReadPriceQuoteRequestResult> {
    const priceQuoteRequest = await this.prisma.priceQuoteRequest.findUnique({
      include: {
        products: {
          include: { product: true },
        },
      },
      where: { uuid },
    });

    if (priceQuoteRequest) {
      const { products, ...data } = priceQuoteRequest;
      const res = plainToClass(
        ReadPriceQuoteRequestResult,
        { ...data, products: [] },
        { excludeExtraneousValues: true },
      );
      if (products.length > 0) {
        res.products = products.map((item) => {
          return plainToClass(
            ProductItemOfPriceQuoteRequestResult,
            {
              uuid: item.productUUID,
              name: item.product.name,
              unit: item.product.unit,
              quantity: item.quantity,
            },
            { excludeExtraneousValues: true },
          );
        });
      }
      return res;
    }
    return {} as ReadPriceQuoteRequestResult;
  }
}
