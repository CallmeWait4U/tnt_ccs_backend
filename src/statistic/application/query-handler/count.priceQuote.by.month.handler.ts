import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StatisticQuery } from 'src/statistic/infrastructure/statistic.query';
import { CountPriceQuoteByMonthQuery } from '../query/count.priceQuote.by.month.query';
import { CountPriceQuoteByMonthResult } from '../query/result/count.priceQuote.by.month.query.result';

@QueryHandler(CountPriceQuoteByMonthQuery)
export class CountPriceQuoteByMonthHandler
  implements
    IQueryHandler<CountPriceQuoteByMonthQuery, CountPriceQuoteByMonthResult>
{
  @Inject()
  private readonly statisticQuery: StatisticQuery;

  async execute(
    query: CountPriceQuoteByMonthQuery,
  ): Promise<CountPriceQuoteByMonthResult> {
    return await this.statisticQuery.countPriceQuoteByMonth(
      query.tenantId,
      query.option,
    );
  }
}
