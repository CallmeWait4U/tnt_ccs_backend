import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductQuery } from 'src/product/infrastructure/product.query';
import { ListProductOptionsQuery } from '../query/list.product.options.query';
import { ListProductOptionsResult } from '../query/result/list.product.options.query.result';

@QueryHandler(ListProductOptionsQuery)
export class ListProductOptionsHandler
  implements IQueryHandler<ListProductOptionsQuery, ListProductOptionsResult>
{
  constructor(private readonly productQuery: ProductQuery) {}

  async execute(
    query: ListProductOptionsQuery,
  ): Promise<ListProductOptionsResult> {
    return await this.productQuery.listProductOptions(query.tenantId);
  }
}
