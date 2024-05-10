import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StatisticQuery } from 'src/statistic/infrastructure/statistic.query';
import { CountCustomersPerPhaseQuery } from '../query/count.customers.per.phase.query';
import { CountCustomersPerPhaseResult } from '../query/result/count.customers.per.phase.query.result';

@QueryHandler(CountCustomersPerPhaseQuery)
export class CountCustomersPerPhaseHandler
  implements
    IQueryHandler<CountCustomersPerPhaseQuery, CountCustomersPerPhaseResult>
{
  @Inject()
  readonly statisticQuery: StatisticQuery;

  async execute(
    query: CountCustomersPerPhaseQuery,
  ): Promise<CountCustomersPerPhaseResult> {
    return await this.statisticQuery.countCustomerPerPhase(query.tenantId);
  }
}
