import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PriceQuoteQuery } from 'src/priceQuote/infrastructure/priceQuote.query';
import { ReadPriceQuoteByCustomerQuery } from '../query/read.priceQuote.by.customer.query';
import { ReadPriceQuoteResult } from '../query/result/read.priceQuote.query.result';

@QueryHandler(ReadPriceQuoteByCustomerQuery)
export class ReadPriceQuoteByCustomerHandler
  implements IQueryHandler<ReadPriceQuoteByCustomerQuery, ReadPriceQuoteResult>
{
  @Inject()
  private readonly priceQuoteQuery: PriceQuoteQuery;

  async execute(
    query: ReadPriceQuoteByCustomerQuery,
  ): Promise<ReadPriceQuoteResult> {
    const customer = await this.priceQuoteQuery.getCustomerFromAccount(
      query.accountUUID,
      query.tenantId,
    );
    return await this.priceQuoteQuery.readPriceQuoteByCustomer(
      query.uuid,
      query.tenantId,
      customer.uuid,
    );
  }
}
