import { Inject } from '@nestjs/common';
import { Customer, StatusPriceQuoteRequest } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetPriceQuoteRequestByCustomerItem,
  GetPriceQuoteRequestByCustomerResult,
} from '../application/query/result/get.priceQuoteRequest.query.result';
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
    tenantId: string,
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
    conditions.push({ tenantId });
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
    tenantId: string,
  ): Promise<ReadPriceQuoteRequestResult> {
    const priceQuoteRequest = await this.prisma.priceQuoteRequest.findUnique({
      include: {
        products: {
          include: { product: true },
        },
      },
      where: { uuid, tenantId },
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

  async getPriceQuoteRequestByCustomer(
    customerUUID: string,
    tenantId: string,
  ): Promise<GetPriceQuoteRequestByCustomerResult> {
    const data = await this.prisma.priceQuoteRequest.findMany({
      where: { customerUUID, tenantId, status: StatusPriceQuoteRequest.SENT },
    });
    return {
      items: data.map((i) =>
        plainToClass(GetPriceQuoteRequestByCustomerItem, i, {
          excludeExtraneousValues: true,
        }),
      ),
    };
  }

  async getCustomer(uuid: string, tenantId: string): Promise<Customer> {
    const data = await this.prisma.priceQuoteRequest.findUnique({
      where: { uuid, tenantId },
      include: { customer: true },
    });
    return data.customer;
  }

  async getListAccountEmployees(
    customerUUID: string,
  ): Promise<{ accountUUID: string; token: string }[]> {
    const customer = await this.prisma.customer.findUnique({
      where: { uuid: customerUUID },
      include: { employees: true },
    });
    const accounts = await this.prisma.account.findMany({
      where: {
        employeeUUID: {
          in: customer.employees.map((employee) => employee.uuid),
        },
      },
    });
    return accounts.map((account) => ({
      accountUUID: account.uuid,
      token: account.accessToken ? account.accessToken : '',
    }));
  }
}
