import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { ListCompanyResult } from '../application/query/result/list.company.result';

export class CompanyQuery {
  @Inject()
  private readonly prisma: PrismaService;
  async listCompany(): Promise<ListCompanyResult> {
    const data = await this.prisma.tenant.findMany({
      select: {
        name: true,
        uuid: true,
        domain: true,
      },
    });
    const result = new ListCompanyResult();
    result.items = data;
    result.total = data.length;
    return result;
  }
}
