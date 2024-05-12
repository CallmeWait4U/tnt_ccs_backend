import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompanyQuery } from 'src/company/insfrastructure/company.query';
import { ListCompanyQuery } from '../query/list.company.query';
import { ListCompanyResult } from '../query/result/list.company.result';

@QueryHandler(ListCompanyQuery)
export class ListCompanyHandler
  implements IQueryHandler<ListCompanyQuery, ListCompanyResult>
{
  // @Inject
  constructor(private readonly companyQuery: CompanyQuery) {}
  async execute(): Promise<ListCompanyResult> {
    return await this.companyQuery.listCompany();
  }
}
