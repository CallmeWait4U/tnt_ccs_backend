import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PriceQuoteQuery } from 'src/priceQuote/infrastructure/priceQuote.query';
import { ReadPriceQuoteQuery } from '../query/read.priceQuote.query';
import { ReadPriceQuoteResult } from '../query/result/read.priceQuote.query.result';

@QueryHandler(ReadPriceQuoteQuery)
export class ReadPriceQuoteHandler
  implements IQueryHandler<ReadPriceQuoteQuery, ReadPriceQuoteResult>
{
  constructor(private readonly priceQuoteQuery: PriceQuoteQuery) {}

  async execute(query: ReadPriceQuoteQuery): Promise<ReadPriceQuoteResult> {
    return await this.priceQuoteQuery.readPriceQuote(query.uuid);
  }
}
