import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PriceQuoteRequestQuery } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.query';
import { GetPriceQuoteRequestByCustomerQuery } from '../query/get.priceQuoteRequest.by.customer.query';
import { GetPriceQuoteRequestByCustomerResult } from '../query/result/get.priceQuoteRequest.query.result';

@QueryHandler(GetPriceQuoteRequestByCustomerQuery)
export class GetPriceQuoteRequestByCustomerHanlder
  implements
    IQueryHandler<
      GetPriceQuoteRequestByCustomerQuery,
      GetPriceQuoteRequestByCustomerResult
    >
{
  @Inject()
  private readonly priceQuoteRequestQuery: PriceQuoteRequestQuery;

  async execute(
    query: GetPriceQuoteRequestByCustomerQuery,
  ): Promise<GetPriceQuoteRequestByCustomerResult> {
    return await this.priceQuoteRequestQuery.getPriceQuoteRequestByCustomer(
      query.customerUUID,
      query.tenantId,
    );
  }
}
