import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductQuery } from 'src/account/infrastructure/account.query';
import { GetProductsQuery } from '../query/get.product.query';
import { GetProductsResult } from '../query/result/get.product.query.result';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler
  implements IQueryHandler<GetProductsQuery, GetProductsResult>
{
  constructor(private readonly accountQuery: ProductQuery) {}

  async execute(query: GetProductsQuery): Promise<GetProductsResult> {
    return await this.accountQuery.getProducts(
      query.offset,
      query.limit,
      query.type,
      query.searchModel,
    );
  }
}
