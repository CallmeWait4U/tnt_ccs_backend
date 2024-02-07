import { Inject } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'libs/database.module';

export class CustomerQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async listCustomers(offset: number, limit: number): Promise<Customer[]> {
    const skip = offset * limit;
    const res = await this.prisma.customer.findMany({
      take: parseInt(limit.toString()),
      skip: skip,
    });

    return res;
  }
  async readCustomer(uuid: string): Promise<Customer> {
    const res = await this.prisma.customer.findFirst({ where: { uuid: uuid } });
    return res;
  }
}
