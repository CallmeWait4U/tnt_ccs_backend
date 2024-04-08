import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountQuery } from 'src/account/infrastructure/account.query';
import { GetAccountsQuery } from '../query/get.accounts.query';
import { GetAccountsResult } from '../query/result/get.accounts.query.result';

@QueryHandler(GetAccountsQuery)
export class GetAccountsHandler
  implements IQueryHandler<GetAccountsQuery, GetAccountsResult>
{
  constructor(private readonly accountQuery: AccountQuery) {}

  async execute(query: GetAccountsQuery): Promise<GetAccountsResult> {
    return await this.accountQuery.getAccounts(
      query.tenantId,
      query.offset,
      query.limit,
      query.type,
      query.searchModel,
    );
  }
}
