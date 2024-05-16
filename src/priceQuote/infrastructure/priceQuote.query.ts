import { Inject } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetPriceQuotesByCustomerItem,
  GetPriceQuotesByCustomerResult,
} from '../application/query/result/get.priceQuote.by.customer.result';
import {
  GetPriceQuotesResult,
  PriceQuoteItem,
} from '../application/query/result/list.priceQuote.query.result';
import {
  ProductItemOfPriceQuote,
  ReadPriceQuoteResult,
} from '../application/query/result/read.priceQuote.query.result';
import { StatisticPriceQuoteQueryResult } from '../application/query/result/statistic.priceQuote.query,result';

export class PriceQuoteQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getPriceQuotes(
    tenantId: string,
    customerUUID: string,
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetPriceQuotesResult> {
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

  async readPriceQuote(
    uuid: string,
    tenantId: string,
    customerUUID?: string,
  ): Promise<ReadPriceQuoteResult> {
    const conditions =
      customerUUID && customerUUID !== ''
        ? { uuid, customerUUID, tenantId }
        : { uuid, tenantId };

    const priceQuote = await this.prisma.priceQuote.findUnique({
      include: {
        products: {
          include: { product: true },
        },
      },
      where: conditions,
    });

    if (priceQuote) {
      const { products, ...data } = priceQuote;
      const res = plainToClass(
        ReadPriceQuoteResult,
        { ...data, products: [] },
        { excludeExtraneousValues: true },
      );
      if (products.length > 0) {
        let total = 0;
        res.products = products.map((item) => {
          total += item.negotiatedPrice * item.quantity;
          return plainToClass(
            ProductItemOfPriceQuote,
            {
              uuid: item.productUUID,
              name: item.product.name,
              unit: item.product.unit,
              negotiatedPrice: item.negotiatedPrice,
              quantity: item.quantity,
            },
            { excludeExtraneousValues: true },
          );
        });
        res.total = total;
      }

      return res;
    }
    return {} as ReadPriceQuoteResult;
  }

  async readPriceQuoteByCustomer(
    uuid: string,
    tenantId: string,
    customerUUID: string,
  ): Promise<ReadPriceQuoteResult> {
    const conditions = { uuid, customerUUID, tenantId };

    const priceQuote = await this.prisma.priceQuote.findUnique({
      include: {
        products: {
          include: { product: true },
        },
      },
      where: conditions,
    });

    if (priceQuote) {
      const { products, ...data } = priceQuote;
      const res = plainToClass(
        ReadPriceQuoteResult,
        { ...data, products: [] },
        { excludeExtraneousValues: true },
      );
      if (products.length > 0) {
        let total = 0;
        res.products = products.map((item) => {
          total += item.negotiatedPrice * item.quantity;
          return plainToClass(
            ProductItemOfPriceQuote,
            {
              uuid: item.productUUID,
              name: item.product.name,
              unit: item.product.unit,
              negotiatedPrice: item.negotiatedPrice,
              quantity: item.quantity,
            },
            { excludeExtraneousValues: true },
          );
        });
        res.total = total;
      }

      return res;
    }
    return {} as ReadPriceQuoteResult;
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

  async getPriceQuoteByCustomer(
    customerUUID: string,
    tenantId: string,
  ): Promise<GetPriceQuotesByCustomerResult> {
    const data = await this.prisma.priceQuote.findMany({
      where: { customerUUID, tenantId },
    });
    return {
      items: data.map((i) =>
        plainToClass(GetPriceQuotesByCustomerItem, i, {
          excludeExtraneousValues: true,
        }),
      ),
    };
  }

  async getStatisticPriceQuote(
    tenantId: string,
  ): Promise<StatisticPriceQuoteQueryResult> {
    const dataBill = await this.prisma.bill.findMany({
      select: {
        uuid: true,
        priceQuoteUUID: true,
      },

      where: { tenantId },
    });

    const uniquePriceQuoteUUIDs = new Set();

    // Lọc và đếm số lượng priceQuoteUUID khác nhau
    dataBill.forEach((bill) => {
      if (bill.priceQuoteUUID) {
        uniquePriceQuoteUUIDs.add(bill.priceQuoteUUID);
      }
    });

    // Số lượng bill có priceQuoteUUID khác nhau
    const numberOfUniquePriceQuoteUUIDs = uniquePriceQuoteUUIDs.size;

    const countPriceQuote = await this.prisma.priceQuote.count({
      where: { tenantId },
    });

    const billQuantity = dataBill.length;

    const dataComplaint = await this.prisma.complaint.findMany({
      where: { tenantId },
      include: {
        listStatus: true,
      },
    });
    const complaintQuantity = dataComplaint.length;

    const complaintStatistic = [
      ...new Set(
        dataComplaint.map((item) => item.listStatus.slice(-1)[0].status),
      ),
    ].map((status) => {
      return {
        status,
        quantity: dataComplaint.filter(
          (item) => item.listStatus.slice(-1)[0].status === status,
        ).length,
      };
    });

    const result = new StatisticPriceQuoteQueryResult();
    result.percerChangeToBill =
      countPriceQuote === 0
        ? 0
        : (numberOfUniquePriceQuoteUUIDs / countPriceQuote) * 100;
    result.billQuantity = billQuantity;
    result.complaintQuantity = complaintQuantity;
    result.complaintStatistic = complaintStatistic;
    return result;
  }
}
