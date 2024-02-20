import { Inject } from '@nestjs/common';
import { Business, Customer, Individual } from '@prisma/client';
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
    const res = await this.prisma.customer.findFirst({
      where: { uuid: uuid },
    });

    return res;
  }
  async readBusiness(uuid: string): Promise<Business> {
    const res = await this.prisma.business.findFirst({
      where: { customerUUID: uuid },
    });

    return res;
  }
  async readInvididual(uuid: string): Promise<Individual> {
    const res = await this.prisma.individual.findFirst({
      where: { customerUUID: uuid },
    });

    return res;
  }
}
