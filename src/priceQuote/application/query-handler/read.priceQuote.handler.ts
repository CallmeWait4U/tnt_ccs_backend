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
    if (query.customerUUID) {
      const customer = await this.priceQuoteQuery.getCustomerFromAccount(
        query.customerUUID,
        query.tenantId,
      );
      return await this.priceQuoteQuery.readPriceQuote(
        query.uuid,
        query.tenantId,
        customer.uuid,
      );
    }
    return await this.priceQuoteQuery.readPriceQuote(
      query.uuid,
      query.tenantId,
    );
  }
}
