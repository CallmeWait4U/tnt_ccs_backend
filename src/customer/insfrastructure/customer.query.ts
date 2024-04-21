import { HttpException, HttpStatus, Inject } from '@nestjs/common';
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
import { StatisticCustomerResult } from '../application/query/result/statistic.customer.result';

export class CustomerQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getCustomers(
    tenantId: string,
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
          if (prop === 'name') {
            obj['OR'] = [
              {
                business: {
                  name: value,
                },
              },
              {
                individual: {
                  name: value,
                },
              },
            ];
          } else if (prop === 'email') {
            obj['OR'] = [
              {
                business: {
                  representativeEmail: value,
                },
              },
              {
                individual: {
                  email: value,
                },
              },
            ];
          } else {
            obj[prop] = {
              [item.valueType === 'text' ? 'contains' : 'equals']: value,
            };
          }
          conditions.push(obj);
        }
      }
    }
    conditions.push({ tenantId });
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
          business: true,
          individual: true,
        },
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.customer.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((i) => {
        const propRelation = {
          name: i.isBusiness ? i.business.name : i.individual.name,
          email: i.isBusiness
            ? i.business.representativeEmail
            : i.individual.email,
          phoneNumber: i.isBusiness
            ? i.business.representativePhone
            : i.individual.phoneNumber,
        };
        return plainToClass(
          CustomerItem,
          {
            ...i,
            ...propRelation,
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

  async getCustomersByEmployee(
    tenantId: string,
    accountUUID: string,
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
    const account = await this.prisma.account.findUnique({
      where: { uuid: accountUUID },
    });
    if (!account.employeeUUID) {
      throw new HttpException(
        'Employee does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    conditions.push(
      {
        employees: {
          some: {
            uuid: account.employeeUUID,
          },
        },
      },
      { tenantId },
    );
    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        include: {
          employees: {
            select: {
              uuid: true,
              name: true,
            },
          },
          phase: {
            select: {
              name: true,
            },
          },
          business: true,
          individual: true,
        },
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.customer.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((i) => {
        const propRelation = {
          name: i.isBusiness ? i.business.name : i.individual.name,
          email: i.isBusiness
            ? i.business.representativeEmail
            : i.individual.email,
          phoneNumber: i.isBusiness
            ? i.business.representativePhone
            : i.individual.phoneNumber,
        };
        return plainToClass(
          CustomerItem,
          {
            ...i,
            ...propRelation,
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
    tenantId: string,
  ): Promise<ReadBusinessResult | ReadIndividualResult> {
    const res = await this.prisma.customer.findUnique({
      where: { uuid, tenantId },
      include: {
        employees: {
          select: {
            uuid: true,
            name: true,
            code: true,
          },
        },
        phase: {
          select: {
            name: true,
          },
        },
        business: true,
        individual: true,
      },
    });
    if (res) {
      if (res.isBusiness) {
        return plainToClass(
          ReadBusinessResult,
          {
            ...res,
            ...res.business,
            ...res.individual,
            phaseName: res.phase ? res.phase.name : '',
          },
          {
            excludeExtraneousValues: true,
          },
        );
      } else {
        return plainToClass(
          ReadIndividualResult,
          {
            ...res,
            ...res.business,
            ...res.individual,
            phaseName: res.phase ? res.phase.name : '',
          },
          {
            excludeExtraneousValues: true,
          },
        );
      }
    }
    return {} as ReadIndividualResult;
  }
  async statisticCustomer(): Promise<StatisticCustomerResult> {
    const res = new StatisticCustomerResult();

    const customersByPhase = await this.prisma.customer.groupBy({
      by: ['phaseUUID'],
      _count: true,
    });

    const customersWithPhaseNames = await Promise.all(
      customersByPhase.map(async (customer) => {
        const phaseName = await this.getPhaseName(customer.phaseUUID);
        return {
          phaseUUID: customer.phaseUUID,
          phaseName,
          count: customer._count,
        };
      }),
    );
    res.ByPhase = customersWithPhaseNames.map((i) => ({
      phaseName: i.phaseName,
      total: i.count,
    }));

    const customersBySource = await this.prisma.customer.groupBy({
      by: ['source'],
      _count: true,
    });
    res.BySource = customersBySource.map((i) => ({
      source: i.source,
      total: i._count,
    }));

    const customerByCity = await this.prisma.customer.groupBy({
      by: ['city'],
      _count: true,
    });
    res.ByLocation = customerByCity.map((i) => ({
      city: i.city,
      total: i._count,
    }));

    const customersByAge = await this.prisma.individual.findMany({
      select: {
        dayOfBirth: true,
      },
    });

    const ageCounts = customersByAge.reduce(
      (acc, customer) => {
        const age =
          new Date().getFullYear() - customer.dayOfBirth.getFullYear();
        if (!acc[age]) {
          acc[age] = 1;
        } else {
          acc[age]++;
        }
        return acc;
      },
      {} as Record<number, number>,
    );
    res.ByAge = Object.entries(ageCounts).map(([age, total]) => ({
      age: Number(age),
      total,
    }));

    return res;
  }
  private async getPhaseName(phaseUUID: string): Promise<string> {
    const phase = await this.prisma.phase.findUnique({
      where: { uuid: phaseUUID },
      select: { name: true },
    });
    return phase ? phase.name : 'Unknown';
  }
}
