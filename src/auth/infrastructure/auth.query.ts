import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';

export class AuthQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async getDomainList(): Promise<string[]> {
    const tenants = await this.prisma.tenant.findMany();
    return tenants.map((tenant) => tenant.domain);
  }
}
