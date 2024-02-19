import { Inject } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'libs/database.module';

export class EmployeeQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async listEmployee(offset: number, limit: number): Promise<Employee[]> {
    const skip = offset * limit;
    const res = await this.prisma.employee.findMany({
      take: parseInt(limit.toString()),
      skip: skip,
    });

    return res;
  }
  async readEmployee(uuid: string): Promise<Employee> {
    const res = await this.prisma.employee.findFirst({ where: { uuid: uuid } });
    return res;
  }
}
