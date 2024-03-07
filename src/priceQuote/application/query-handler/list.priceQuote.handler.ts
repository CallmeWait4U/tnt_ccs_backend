import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PriceQuoteQuery } from 'src/priceQuote/infrastructure/priceQuote.query';
import { GetPriceQuotesQuery } from '../query/list.priceQuote.query';
import { GetPriceQuotesResult } from '../query/result/list.priceQuote.query.result';

@QueryHandler(GetPriceQuotesQuery)
export class GetPriceQuotesHandler
  implements IQueryHandler<GetPriceQuotesQuery, GetPriceQuotesResult>
{
  constructor(private readonly priceQuoteQuery: PriceQuoteQuery) {}

  async execute(query: GetPriceQuotesQuery): Promise<GetPriceQuotesResult> {
    return await this.priceQuoteQuery.getPriceQuotes(
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
