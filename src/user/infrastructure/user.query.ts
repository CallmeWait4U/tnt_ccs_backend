import { Inject } from '@nestjs/common';
import { TypeAccount } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetHomePageForEmployeeResult,
  TaskForEmployee,
} from '../application/query/result/get.home.page.for.employee.query.result';
import {
  GetInfoUserBusinessResult,
  GetInfoUserEmployeeResult,
  GetInfoUserIndividualResult,
} from '../application/query/result/get.info.user.query.result';

export class UserQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getInfoUser(
    uuid: string,
    tenantId: string,
  ): Promise<
    | GetInfoUserBusinessResult
    | GetInfoUserIndividualResult
    | GetInfoUserEmployeeResult
  > {
    const account = await this.prisma.account.findUnique({
      where: { uuid, tenantId },
      include: {
        customer: {
          include: {
            individual: true,
            business: true,
            phase: {
              select: {
                name: true,
              },
            },
          },
        },
        employee: true,
      },
    });
    if (account.type !== TypeAccount.CUSTOMER) {
      return plainToClass(
        GetInfoUserEmployeeResult,
        {
          ...account.employee,
          type: account.type,
        },
        {
          excludeExtraneousValues: true,
        },
      );
    }
    if (account.customer.isBusiness) {
      return plainToClass(GetInfoUserBusinessResult, {
        ...account.customer,
        ...account.customer.business,
        phaseName: account.customer.phase.name,
        type: account.type,
      });
    }
    return plainToClass(GetInfoUserIndividualResult, {
      ...account.customer,
      ...account.customer.individual,
      phaseName: account.customer.phase.name,
      type: account.type,
    });
  }

  async getHomePageForEmployee(
    accountUUID: string,
    tenantId: string,
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetHomePageForEmployeeResult> {
    const account = await this.prisma.account.findUnique({
      where: { uuid: accountUUID, tenantId },
      include: { employee: true },
    });
    if (account.employee) {
      const employee = await this.prisma.employee.findUnique({
        where: { uuid: account.employee.uuid, tenantId },
        include: {
          _count: {
            select: { customers: true, complaints: true, priceQuote: true },
          },
        },
      });
      const conditions = [];
      const search: { [key: string]: any } = searchModel
        ? JSON.parse(searchModel)
        : undefined;
      if (search) {
        for (const [prop, item] of Object.entries(search)) {
          const obj = {};
          const { value } = this.util.buildSearch(item);
          if (item.isCustom) {
            if (prop === 'customerName') {
              conditions.push({ customer: { some: { name: value } } });
            }
          } else {
            obj[prop] = value;
            conditions.push(obj);
          }
        }
      }
      conditions.push({ tenantId });
      const [data, totalTask] = await Promise.all([
        this.prisma.task.findMany({
          skip: Number(offset),
          take: Number(limit),
          where: { AND: conditions },
          include: {
            customer: {
              select: {
                name: true,
              },
            },
            employees: {
              select: {
                name: true,
              },
            },
          },
        }),
        this.prisma.task.count({ where: { AND: conditions } }),
      ]);
      return {
        numCustomers: employee._count.customers,
        numComplaints: employee._count.complaints,
        numPriceQuotes: employee._count.priceQuote,
        listTask: data.map((i) =>
          plainToClass(
            TaskForEmployee,
            {
              ...i,
              customerName: i.customer.name,
              activityUUID: i.activityUUID,
            },
            { excludeExtraneousValues: true },
          ),
        ),
        totalTask,
      };
    }
    return {
      numCustomers: 0,
      numComplaints: 0,
      numPriceQuotes: 0,
      listTask: [],
      totalTask: 0,
    };
  }
}
