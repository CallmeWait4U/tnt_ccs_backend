import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StatisticQuery } from 'src/statistic/infrastructure/statistic.query';
import { CountCustomersByLocationQuery } from '../query/count.customers.by.location.query';
import { CountCustomersByLocationResult } from '../query/result/count.customers.by.location.query.result';

@QueryHandler(CountCustomersByLocationQuery)
export class CountCustomersByLocationHandler
  implements
    IQueryHandler<
      CountCustomersByLocationQuery,
      CountCustomersByLocationResult
    >
{
  @Inject()
  private readonly statisticQuery: StatisticQuery;

  async execute(
    query: CountCustomersByLocationQuery,
  ): Promise<CountCustomersByLocationResult> {
    return await this.statisticQuery.countCustomersByLocation(query.tenantId);
  }
}
