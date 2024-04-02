import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  BillItem,
  GetBillsResult,
} from '../application/query/result/list.bill.query.result';
import {
  ProductItemOfBill,
  ReadBillResult,
} from '../application/query/result/read.bill.query.result';

export class BillQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getBills(
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetBillsResult> {
    const conditions = [];
    const search = searchModel ? JSON.parse(searchModel) : undefined;

    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        const { value } = this.util.buildSearch(item);
        obj[prop] = value;
        conditions.push(obj);
      }
    }
    const [data, total] = await Promise.all([
      this.prisma.bill.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        include: {
          customer: {
            include: {
              business: true,
              individual: true,
            },
          },
        },
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.bill.count({ where: { AND: conditions } }),
    ]);

    return {
      items: data.map((i) => {
        const name =
          i.customer.isBusiness === true
            ? i.customer.business.name
            : i.customer.individual.name;
        const phoneNumber =
          i.customer.isBusiness === true
            ? i.customer.business.representativePhone
            : i.customer.individual.phoneNumber;
        return plainToClass(
          BillItem,
          {
            ...i,
            name: name,
            phoneNumber: phoneNumber,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readBill(uuid: string, searchModel?: any): Promise<ReadBillResult> {
    const conditions = [];
    const search = searchModel ? JSON.parse(searchModel) : undefined;

    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        const { value } = this.util.buildSearch(item);
        obj[prop] = value;
        conditions.push(obj);
      }
    }
    const bill = await this.prisma.bill.findUnique({
      include: {
        products: {
          include: { product: true },
        },
      },
      where: { uuid },
    });

    if (bill) {
      const { products, ...data } = bill;
      const res = plainToClass(
        ReadBillResult,
        { ...data, products: [] },
        { excludeExtraneousValues: true },
      );
      let total = 0;
      if (products.length > 0) {
        res.products = products.map((item) => {
          total += item.fixedPrice * item.quantity;
          return plainToClass(
            ProductItemOfBill,
            {
              uuid: item.productUUID,
              name: item.product.name,
              fixedPrice: item.fixedPrice,
              quantity: item.quantity,
            },
            { excludeExtraneousValues: true },
          );
        });
      }
      res.total = total;
      return res;
    }
    return {} as ReadBillResult;
  }
}
