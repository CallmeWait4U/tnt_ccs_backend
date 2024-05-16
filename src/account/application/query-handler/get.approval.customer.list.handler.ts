import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountQuery } from 'src/account/infrastructure/account.query';
import { GetApprovalCustomerListQuery } from '../query/get.approval.customer.list.query';
import { GetAccountsResult } from '../query/result/get.accounts.query.result';

@QueryHandler(GetApprovalCustomerListQuery)
export class GetApprovalCustomerListHandler
  implements IQueryHandler<GetApprovalCustomerListQuery, GetAccountsResult>
{
  @Inject()
  private readonly accountQuery: AccountQuery;

  async execute(
    query: GetApprovalCustomerListQuery,
  ): Promise<GetAccountsResult> {
    return await this.accountQuery.getApprovalCustomersList(
      query.tenantId,
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
