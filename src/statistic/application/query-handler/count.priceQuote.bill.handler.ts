import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StatisticQuery } from 'src/statistic/infrastructure/statistic.query';
import { CountPriceQuoteAndBillQuery } from '../query/count.priceQuote.bill.query';
import { CountPriceQuoteAndBillResult } from '../query/result/count.priceQuote.bill.query.result';

@QueryHandler(CountPriceQuoteAndBillQuery)
export class CountPriceQuoteAndBillHandler
  implements
    IQueryHandler<CountPriceQuoteAndBillQuery, CountPriceQuoteAndBillResult>
{
  @Inject()
  private readonly statisticQuery: StatisticQuery;

  async execute(
    query: CountPriceQuoteAndBillQuery,
  ): Promise<CountPriceQuoteAndBillResult> {
    return await this.statisticQuery.countPriceQuoteAndBill(query.tenantId);
  }
}
