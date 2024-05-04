import { Inject } from '@nestjs/common';
import { Prisma, Tenant } from '@prisma/client';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';

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
}
