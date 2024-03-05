import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  ListProductResult,
  ProductItem,
} from '../application/query/result/list.product.query.result';
import { ReadProductResult } from '../application/query/result/read.product.query.result';

export class ProductQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async listProduct(
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<ListProductResult> {
    const conditions = [];
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const { value } = this.util.buildSearch(item);
        if (prop === 'name') {
          conditions.push({ some: { name: value } });
        }
        if (prop === 'code') {
          conditions.push({ some: { code: value } });
        }
        if (prop === 'features') {
          conditions.push({ some: { features: value } });
        }
        if (prop === 'quantity') {
          conditions.push({ some: { quantity: value } });
        }
        if (prop === 'description') {
          conditions.push({ some: { description: value } });
        }
        if (prop === 'price') {
          conditions.push({ some: { price: value } });
        }
        if (prop === 'unite') {
          conditions.push({ some: { unite: value } });
        }
      }
    }
    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.account.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((item) => {
        return plainToClass(
          ProductItem,
          {
            ...item,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readProduct(uuid: string): Promise<ReadProductResult> {
    const res = await this.prisma.product.findUnique({
      where: { uuid },
    });
    if (res) {
      return plainToClass(
        ReadProductResult,
        { ...res },
        { excludeExtraneousValues: true },
      );
    }
    return {} as ReadProductResult;
  }
}
