import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PriceQuoteQuery } from 'src/priceQuote/infrastructure/priceQuote.query';
import { GetPriceQuotesByCustomerQuery } from '../query/get.priceQuote.by.customer.query';
import { GetPriceQuotesByCustomerResult } from '../query/result/get.priceQuote.by.customer.result';

@QueryHandler(GetPriceQuotesByCustomerQuery)
export class GetPriceQuotesByCustomerHandler
  implements
    IQueryHandler<
      GetPriceQuotesByCustomerQuery,
      GetPriceQuotesByCustomerResult
    >
{
  @Inject()
  private readonly priceQuoteQuery: PriceQuoteQuery;

  async execute(
    query: GetPriceQuotesByCustomerQuery,
  ): Promise<GetPriceQuotesByCustomerResult> {
    return await this.priceQuoteQuery.getPriceQuoteByCustomer(
      query.customerUUID,
      query.tenantId,
    );
  }
}
