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
import {
  StatisticCustomerByTimeResult,
  StatisticCustomerResult,
} from '../application/query/result/statistic.customer.result';

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
          name: i.name,
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
          name: i.name,
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
  async statisticCustomer(tenantId: string): Promise<StatisticCustomerResult> {
    const res = new StatisticCustomerResult();

    ///////////////////////////////////////////////// statistic by phase
    const phases = await this.prisma.phase.findMany({
      select: {
        uuid: true,
        name: true,
      },
      where: { tenantId },
    });

    const individualForStatistic = await this.prisma.individual.findMany({
      select: {
        dayOfBirth: true,
      },
      where: { customer: { tenantId: tenantId } },
    });
    ///////////////////////////////////////////////////// statistic by phase
    const customersByPhase = await this.prisma.customer.groupBy({
      by: ['phaseUUID'],
      _count: true,
      where: { tenantId },
    });

    const customersWithPhaseNames = await Promise.all(
      customersByPhase.map(async (customer) => {
        const phaseName = this.getPhaseName(customer.phaseUUID, phases);
        return {
          phaseUUID: customer.phaseUUID,
          phaseName,
          count: customer._count,
        };
      }),
    );
    res.ByPhase = customersWithPhaseNames.map((i) => ({
      phaseName: i.phaseName,
      phaseUUID: i.phaseUUID,
      total: i.count,
    }));

    ///////////////////////////////////////////////////// statistic by source
    const customersBySource = await this.prisma.customer.groupBy({
      by: ['source'],
      _count: true,
      where: { tenantId },
    });
    res.BySource = customersBySource.map((i) => ({
      source: i.source,
      total: i._count,
    }));

    ///////////////////////////////////////////////////// statistic by location
    const customerByCity = await this.prisma.customer.groupBy({
      by: ['city'],
      _count: true,
      where: { tenantId },
    });
    res.ByLocation = customerByCity.map((i) => ({
      city: i.city,
      total: i._count,
    }));

    ///////////////////////////////////////////////// statistic by age
    const ageCounts = individualForStatistic.reduce(
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

    ///////////////////////////////////////////////////// statistic by time and phase
    const customerForStatistic = await this.prisma.customer.findMany({
      select: {
        createdAt: true,
        phaseUUID: true,
      },
      where: { tenantId },
    });
    const customerByTime = customerForStatistic.reduce(
      (acc, customer) => {
        const month = new Date(customer.createdAt).getMonth();
        const phaseUUID = customer.phaseUUID;
        if (!acc[month]) {
          acc[month] = {
            monthInYear: new Date(customer.createdAt),
            groupByPhase: [],
            total: 1,
          };
        } else {
          acc[month].total++;
        }
        if (
          acc[month].groupByPhase.findIndex(
            (i) => i.phaseUUID === phaseUUID,
          ) === -1
        ) {
          const phaseName = this.getPhaseName(customer.phaseUUID, phases);
          acc[month].groupByPhase.push({
            phaseUUID,
            phaseName,
            total: 1,
          });
        } else {
          acc[month].groupByPhase.find((i) => i.phaseUUID === phaseUUID)
            .total++;
        }
        return acc;
      },
      {} as Record<number, StatisticCustomerByTimeResult>,
    );
    res.ByTime = Object.values(customerByTime);

    return res;
  }
  private getPhaseName(phaseUUID: string, phases: any[]): string {
    const filterPhase = phases.filter((i) => i.uuid === phaseUUID);
    if (filterPhase.length === 0) {
      return 'Unknown';
    }
    return filterPhase[0].name;
  }
}
