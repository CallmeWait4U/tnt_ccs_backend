import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  CustomerItem,
  GetCustomersResult,
} from '../application/query/result/get.customers.query.result';
import {
  ReadBusinessResult,
  ReadIndividualResult,
} from '../application/query/result/read.customer.query.result';

export class CustomerQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getCustomers(
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetCustomersResult> {
    const conditions = [];
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        if (item.isCustom) {
          if (prop === 'employees') {
            const { value } = this.util.buildSearch(item);
            conditions.push({ employee: { some: { name: value } } });
          }
          if (prop === 'phaseName') {
            const { value } = this.util.buildSearch(item);
            conditions.push({ phase: { name: value } });
          }
        } else {
          const { value } = this.util.buildSearch(item);
          obj[prop] = value;
          conditions.push(obj);
        }
      }
    }
    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        include: {
          employees: {
            select: {
              name: true,
            },
          },
          phase: {
            select: {
              name: true,
            },
          },
        },
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.customer.count({ where: { AND: conditions } }),
    ]);

    return {
      items: data.map((i) => {
        return plainToClass(
          CustomerItem,
          {
            ...i,
            employees: i.employees
              ? i.employees.map((employee) => employee.name)
              : [],
            phaseName: i.phase ? i.phase.name : '',
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readCustomer(
    uuid: string,
  ): Promise<ReadBusinessResult | ReadIndividualResult> {
    const res = await this.prisma.customer.findUnique({
      where: { uuid },
      include: {
        employees: {
          select: {
            name: true,
            code: true,
          },
        },
        phase: {
          select: {
            name: true,
          },
        },
      },
    });
    if (res) {
      if (res.isBusiness) {
        return plainToClass(
          ReadBusinessResult,
          { ...res, phaseName: res.phase ? res.phase.name : '' },
          {
            excludeExtraneousValues: true,
          },
        );
      } else {
        return plainToClass(
          ReadIndividualResult,
          { ...res, phaseName: res.phase ? res.phase.name : '' },
          {
            excludeExtraneousValues: true,
          },
        );
      }
    }
    return {} as ReadIndividualResult;
  }

  // async readBusiness(uuid: string): Promise<Business> {
  //   const res = await this.prisma.business.findFirst({
  //     where: { customerUUID: uuid },
  //   });

  //   return res;
  // }
  // async readInvididual(uuid: string): Promise<Individual> {
  //   const res = await this.prisma.individual.findFirst({
  //     where: { customerUUID: uuid },
  //   });

  //   return res;
  // }
}
