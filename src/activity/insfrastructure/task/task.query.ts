import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetTasksResult,
  TaskItem,
} from 'src/activity/application/task/query/result/get.tasks.query.result';
import { ReadTaskResult } from 'src/activity/application/task/query/result/read.task.query.result';

export class TaskQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getTasks(
    activityUUID: string,
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetTasksResult> {
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
          if (prop === 'employeeName') {
            conditions.push({ employee: { some: { name: value } } });
          }
        } else {
          obj[prop] = value;
          conditions.push(obj);
        }
      }
    }
    const [data, total] = await Promise.all([
      this.prisma.task.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        include: {
          customer: {
            select: {
              isBusiness: true,
              business: true,
              individual: true,
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
      items: data.map((i) => {
        return plainToClass(
          TaskItem,
          {
            ...i,
            customerName: i.customer.isBusiness
              ? i.customer.business.name
              : i.customer.individual.name,
            employeeName: i.employees.map((employee) => employee.name),
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readTask(uuid: string): Promise<ReadTaskResult> {
    const res = await this.prisma.task.findFirst({
      where: { uuid: uuid },
      include: {
        customer: {
          select: {
            code: true,
            isBusiness: true,
            business: true,
            individual: true,
          },
        },
        employees: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
    if (!res) return {} as ReadTaskResult;
    return plainToClass(
      ReadTaskResult,
      {
        ...res,
        customerCode: res.customer.code,
        customerName: res.customer.isBusiness
          ? res.customer.business.name
          : res.customer.individual.name,
      },
      { excludeExtraneousValues: true },
    );
  }
}
