import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PriceQuoteQuery } from 'src/priceQuote/infrastructure/priceQuote.query';
import { StatisticPriceQuoteQueryResult } from '../query/result/statistic.priceQuote.query,result';
import { StatisticPriceQuoteQuery } from '../query/statistic.priceQuote.query';
@QueryHandler(StatisticPriceQuoteQuery)
export class StatisticPriceQuoteHandler
  implements
    IQueryHandler<StatisticPriceQuoteQuery, StatisticPriceQuoteQueryResult>
{
  constructor(private readonly priceQuoteQuery: PriceQuoteQuery) {}

  async execute(query: StatisticPriceQuoteQuery) {
    return this.priceQuoteQuery.getStatisticPriceQuote(query.tenantId);
  }
}
