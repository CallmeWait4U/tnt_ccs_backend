import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductQuery } from 'src/product/infrastructure/product.query';
import { ListProductQuery } from '../query/list.product.query';
import { ListProductResult } from '../query/result/list.product.query.result';

@QueryHandler(ListProductQuery)
export class GetProductsHandler
  implements IQueryHandler<ListProductQuery, ListProductResult>
{
  constructor(private readonly productQuery: ProductQuery) {}

  async execute(query: ListProductQuery): Promise<ListProductResult> {
    return await this.productQuery.listProduct(
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
