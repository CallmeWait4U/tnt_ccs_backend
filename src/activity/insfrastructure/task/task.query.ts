import { Inject } from '@nestjs/common';
import { Employee, Prisma, StatusTask } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetTasksByCustomerItem,
  GetTasksByCustomerResult,
} from 'src/activity/application/task/query/result/get.tasks.by.customer.query.result';
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
    tenantId: string,
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
    conditions.push({ activityUUID }, { tenantId });
    const [data, total] = await Promise.all([
      this.prisma.task.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },
        include: {
          customer: {
            select: {
              isBusiness: true,
              name: true,
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
            customerName: i.customer.name,
            employeeName: i.employees.map((employee) => employee.name),
            activityUUID: i.activityUUID,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readTask(tenantId: string, uuid: string): Promise<ReadTaskResult> {
    const res = await this.prisma.task.findUnique({
      where: { uuid, tenantId },
      include: {
        customer: {
          select: {
            code: true,
            isBusiness: true,
            name: true,
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
        customerName: res.customer.name,
      },
      { excludeExtraneousValues: true },
    );
  }

  async getInfoEmployee(
    employeeUUID: string,
    tenantId: string,
  ): Promise<Employee> {
    const account = await this.prisma.account.findUnique({
      where: { uuid: employeeUUID, tenantId },
      include: { employee: true },
    });
    return account.employee;
  }

  async getInfoCustomer(
    taskUUID: string,
    tenantId: string,
  ): Promise<
    Prisma.CustomerGetPayload<{ include: { individual: true; business: true } }>
  > {
    const task = await this.prisma.task.findUnique({
      where: { uuid: taskUUID, tenantId },
      include: { customer: { include: { individual: true, business: true } } },
    });
    return task.customer;
  }

  async getTasksByCustomer(
    tenantId: string,
    customerUUID: string,
    history: boolean,
  ): Promise<GetTasksByCustomerResult> {
    const conditions = [];
    if (history === true) {
      conditions.push(
        { tenantId },
        { customerUUID },
        { status: StatusTask.COMPLETED },
      );
    } else {
      conditions.push(
        { tenantId },
        { customerUUID },
        { status: { in: [StatusTask.INPROGRESS, StatusTask.OVERDUE] } },
      );
    }
    const [data, total] = await Promise.all([
      this.prisma.task.findMany({
        where: { AND: conditions },
        include: {
          activity: { select: { name: true, uuid: true } },
          employees: { select: { name: true } },
        },
      }),
      this.prisma.task.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((item) => {
        return plainToClass(
          GetTasksByCustomerItem,
          {
            ...item,
            activityName: item.activity.name,
            activityUUID: item.activity.uuid,
            employeeName: item.employees.map((employee) => employee.name),
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }
}
