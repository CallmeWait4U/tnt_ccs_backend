import { Inject } from '@nestjs/common';
import { TypeAccount } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  AccountItem,
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
    if (search) {
      if (type === TypeAccount.CUSTOMER) {
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
    conditions.push({ tenantId });
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
          AccountItem,
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
