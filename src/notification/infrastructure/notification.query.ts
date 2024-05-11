import { Inject } from '@nestjs/common';
import { Prisma, Tenant } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetNotificationsItem,
  GetNotificationsResult,
} from '../application/query/result/get.notifications.query.result';

export class NotificationQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getTasksByCustomer(): Promise<{
    customers: Prisma.CustomerGetPayload<{
      include: {
        tasks: { include: { activity: true } };
        business: true;
        individual: true;
      };
    }>[];
    tenants: Tenant[];
  }> {
    const nextWeek = Date.now() + 24 * 60 * 60 * 1000;
    const nextWeekDate = new Date(nextWeek).toISOString();
    const customers = await this.prisma.customer.findMany({
      where: {
        tasks: {
          some: {
            startDate: {
              lte: nextWeekDate,
            },
          },
        },
      },
      take: 1,
      include: {
        tasks: { include: { activity: true } },
        business: true,
        individual: true,
      },
    });
    const tenants = await this.prisma.tenant.findMany();
    return { customers, tenants };
  }

  async getTasksByEmployee(): Promise<{
    employees: Prisma.EmployeeGetPayload<{
      include: {
        tasks: { include: { activity: true } };
      };
    }>[];
    tenants: Tenant[];
  }> {
    const employees = await this.prisma.employee.findMany({
      take: 1,
      include: {
        tasks: { include: { activity: true } },
      },
    });
    const tenants = await this.prisma.tenant.findMany();
    return { employees, tenants };
  }

  async getNotification(
    uuid: string,
    tenantId: string,
  ): Promise<GetNotificationsResult> {
    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { accountUUID: uuid, tenantId },
      }),
      this.prisma.notification.count({
        where: { accountUUID: uuid, tenantId },
      }),
    ]);
    return {
      items: data.map((i) =>
        plainToClass(GetNotificationsItem, i, {
          excludeExtraneousValues: true,
        }),
      ),
      total,
    };
  }
}
