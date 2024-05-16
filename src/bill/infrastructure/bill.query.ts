import { Inject } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetBillByCustomerItem,
  GetBillByCustomerResult,
} from '../application/query/result/list.bill.by.customer.result';
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
    tenantId: string,
    customerUUID: string,
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetBillsResult> {
    const conditions = [];
    const search = searchModel ? JSON.parse(searchModel) : undefined;
    conditions.push({ tenantId }, { customerUUID });
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
        const name = i.customer.name;
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

  async getBillsByCustomer(
    customerUUID: string,
    tenantId: string,
  ): Promise<GetBillByCustomerResult> {
    const [data, total] = await Promise.all([
      this.prisma.bill.findMany({ where: { tenantId, customerUUID } }),
      this.prisma.bill.count({ where: { tenantId, customerUUID } }),
    ]);
    return {
      items: data.map((i) =>
        plainToClass(GetBillByCustomerItem, i, {
          excludeExtraneousValues: true,
        }),
      ),
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

  async getCustomerFromAccount(
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
