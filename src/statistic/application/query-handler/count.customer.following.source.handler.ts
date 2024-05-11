import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StatisticQuery } from 'src/statistic/infrastructure/statistic.query';
import { CountCustomerFollowingSourceQuery } from '../query/count.customer.following.source.query';
import { CountCustomerFollowingSourceResult } from '../query/result/count.customer.following.source.query.result';

@QueryHandler(CountCustomerFollowingSourceQuery)
export class CountCustomerFollowingSourceHandler
  implements
    IQueryHandler<
      CountCustomerFollowingSourceQuery,
      CountCustomerFollowingSourceResult
    >
{
  @Inject()
  private readonly statisticQuery: StatisticQuery;

  async execute(
    query: CountCustomerFollowingSourceQuery,
  ): Promise<CountCustomerFollowingSourceResult> {
    return await this.statisticQuery.countCustomersFollowingSource(
      query.tenantId,
    );
  }
}
