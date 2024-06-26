import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PriceQuoteRequestQuery } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.query';
import { GetPriceQuoteRequestsQuery } from '../query/list.priceQuoteRequest.query';
import { GetPriceQuoteRequestsResult } from '../query/result/list.priceQuoteRequest.query.result';

@QueryHandler(GetPriceQuoteRequestsQuery)
export class GetPriceQuoteRequestsHandler
  implements
    IQueryHandler<GetPriceQuoteRequestsQuery, GetPriceQuoteRequestsResult>
{
  constructor(
    private readonly priceQuoteRequestQuery: PriceQuoteRequestQuery,
  ) {}

  async execute(
    query: GetPriceQuoteRequestsQuery,
  ): Promise<GetPriceQuoteRequestsResult> {
    const customer = await this.priceQuoteRequestQuery.getCustomerFromAccount(
      query.accountUUID,
      query.tenantId,
    );
    return await this.priceQuoteRequestQuery.getPriceQuoteRequests(
      customer.uuid,
      query.tenantId,
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
