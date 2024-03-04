import { Inject } from '@nestjs/common';
import { TypeProduct } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetProductsResult,
  ProductItem,
} from '../application/query/result/get.product.query.result';
import { ReadProductResult } from '../application/query/result/read.product.query.result';

export class ProductQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getProducts(
    offset: number,
    limit: number,
    type: TypeProduct,
    searchModel?: any,
  ): Promise<GetProductsResult> {
    const conditions = [];
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    if (search) {
      if (type === TypeProduct.CUSTOMER) {
        //
      } else {
        for (const [prop, item] of Object.entries(search)) {
          const obj = {};
          if (item.isCustom) {
            const { value } = this.util.buildSearch(item);
            if (prop === 'name') {
              conditions.push({ employee: { some: { name: value } } });
            }
            if (prop === 'code') {
              conditions.push({ employee: { some: { code: value } } });
            }
            if (prop === 'gender') {
              conditions.push({ employee: { some: { gender: value } } });
            }
            if (prop === 'position') {
              conditions.push({ employee: { some: { position: value } } });
            }
            if (prop === 'dayOfBirth') {
              conditions.push({ employee: { some: { dayOfBith: value } } });
            }
            if (prop === 'email') {
              conditions.push({ employee: { some: { email: value } } });
            }
            if (prop === 'phoneNumber') {
              conditions.push({ employee: { some: { phoneNumber: value } } });
            }
          } else {
            const { value } = this.util.buildSearch(item);
            obj[prop] = value;
            conditions.push(obj);
          }
        }
      }
    }
    const [data, total] = await Promise.all([
      this.prisma.account.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        include: {
          customer: true,
          employee: true,
        },
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.account.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((i) => {
        return plainToClass(
          ProductItem,
          {
            ...i,
            ...i.employee,
            ...i.customer,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readProduct(uuid: string): Promise<ReadProductResult> {
    const res = await this.prisma.account.findUnique({
      where: { uuid },
      include: {
        employee: true,
      },
    });
    if (res) {
      const employee = res.employee ? res.employee : {};
      return plainToClass(
        ReadProductResult,
        { ...res, ...employee },
        { excludeExtraneousValues: true },
      );
    }
    return {} as ReadProductResult;
  }
}
