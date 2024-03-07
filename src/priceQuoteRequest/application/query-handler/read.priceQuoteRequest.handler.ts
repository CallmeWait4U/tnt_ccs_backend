import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PriceQuoteRequestQuery } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.query';
import { ReadPriceQuoteRequestQuery } from '../query/read.priceQuoteRequest.query';
import { ReadPriceQuoteRequestResult } from '../query/result/read.priceQuoteRequest.query.result';

@QueryHandler(ReadPriceQuoteRequestQuery)
export class ReadPriceQuoteRequestHandler
  implements
    IQueryHandler<ReadPriceQuoteRequestQuery, ReadPriceQuoteRequestResult>
{
  constructor(
    private readonly priceQuoteRequestQuery: PriceQuoteRequestQuery,
  ) {}

  async execute(
    query: ReadPriceQuoteRequestQuery,
  ): Promise<ReadPriceQuoteRequestResult> {
    return await this.priceQuoteRequestQuery.readPriceQuoteRequest(query.uuid);
  }
}
