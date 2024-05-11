import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StatisticQuery } from 'src/statistic/infrastructure/statistic.query';
import { CountCustomerPhaseByMonthQuery } from '../query/count.customer.phase.by.month.query';
import { CountCustomerPhaseByMonthResult } from '../query/result/count.customer.phase.by.month.query.result';

@QueryHandler(CountCustomerPhaseByMonthQuery)
export class CountCustomerPhaseByMonthHandler
  implements
    IQueryHandler<
      CountCustomerPhaseByMonthQuery,
      CountCustomerPhaseByMonthResult
    >
{
  @Inject()
  private readonly statisticQuery: StatisticQuery;

  async execute(
    query: CountCustomerPhaseByMonthQuery,
  ): Promise<CountCustomerPhaseByMonthResult> {
    return await this.statisticQuery.countCustomerPhaseByMonth(
      query.tenantId,
      query.option,
    );
  }
}
