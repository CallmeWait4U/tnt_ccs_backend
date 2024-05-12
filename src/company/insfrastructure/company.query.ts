import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { ListCompanyResult } from '../application/query/result/list.company.result';

export class CompanyQuery {
  @Inject()
  private readonly prisma: PrismaService;
  async listCompany(): Promise<ListCompanyResult> {
    return (await this.prisma.tenant.findMany({
      select: {
        name: true,
        uuid: true,
        domain: true,
      },
    })) as unknown as ListCompanyResult;
  }
}
