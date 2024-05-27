import { Inject } from '@nestjs/common';
import { StatusCustomerAccount, TypeAccount } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  AccountCustomerItem,
  AccountEmployeeItem,
  GetAccountsResult,
} from '../application/query/result/get.accounts.query.result';
import { ReadAccountResult } from '../application/query/result/read.account.query.result';

export class AccountQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getAccounts(
    tenantId: string,
    offset: number,
    limit: number,
    type: TypeAccount,
    searchModel?: any,
  ): Promise<GetAccountsResult> {
    const conditions = [];
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    conditions.push({ tenantId });
    if (search) {
      if (type === TypeAccount.CUSTOMER) {
        for (const [prop, item] of Object.entries(search)) {
          const obj = {};
          if (item.isCustom) {
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
        conditions.push({ hasAccount: StatusCustomerAccount.APPROVED });
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
        conditions.push({ OR: [{ type: 'ADMIN' }, { type: 'EMPLOYEE' }] });
      }
    }
    if (type === TypeAccount.CUSTOMER) {
      const [data, total] = await Promise.all([
        this.prisma.customer.findMany({
          skip: Number(offset),
          take: Number(limit),
          where: { AND: conditions },
          include: {
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
            AccountCustomerItem,
            {
              ...i,
              ...propRelation,
              phaseName: i.phase.name,
            },
            { excludeExtraneousValues: true },
          );
        }),
        total,
      };
    }
    conditions.push({
      type: { in: [TypeAccount.ADMIN, TypeAccount.EMPLOYEE] },
    });
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
          AccountEmployeeItem,
          {
            ...i.employee,
            ...i.customer,
            ...i,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async getApprovalCustomersList(
    tenantId: string,
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetAccountsResult> {
    const conditions = [];
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    conditions.push({ tenantId });
    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        if (item.isCustom) {
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
    conditions.push({ hasAccount: StatusCustomerAccount.PENDING });
    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        include: {
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
          AccountCustomerItem,
          {
            ...i,
            ...propRelation,
            phaseName: i.phase.name,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readAccount(
    uuid: string,
    tenantId: string,
  ): Promise<ReadAccountResult> {
    const res = await this.prisma.account.findUnique({
      where: { uuid, tenantId },
      include: {
        employee: true,
      },
    });
    if (res) {
      const employee = res.employee ? res.employee : {};
      return plainToClass(
        ReadAccountResult,
        { ...res, ...employee },
        { excludeExtraneousValues: true },
      );
    }
    return {} as ReadAccountResult;
  }
}
