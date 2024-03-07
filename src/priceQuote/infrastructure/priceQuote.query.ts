import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetPriceQuotesResult,
  PriceQuoteItem,
} from '../application/query/result/list.priceQuote.query.result';
import { ReadPriceQuoteResult } from '../application/query/result/read.priceQuote.query.result';

export class PriceQuoteQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getPriceQuotes(
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetPriceQuotesResult> {
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
      this.prisma.priceQuote.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },

        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.priceQuote.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((i) => {
        return plainToClass(
          PriceQuoteItem,
          {
            ...i,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readPriceQuote(uuid: string): Promise<ReadPriceQuoteResult> {
    const res = await this.prisma.priceQuote.findUnique({
      where: { uuid },
    });
    if (res) {
      return plainToClass(
        ReadPriceQuoteResult,
        { ...res },
        { excludeExtraneousValues: true },
      );
    }
    return {} as ReadPriceQuoteResult;
  }
}
