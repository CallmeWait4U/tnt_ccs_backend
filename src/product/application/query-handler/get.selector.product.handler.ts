import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductQuery } from 'src/product/infrastructure/product.query';
import { GetSelectorProductQuery } from '../query/get.selector.product.query';
import { GetSelectorProductResult } from '../query/result/get.selector.product.result';

@QueryHandler(GetSelectorProductQuery)
export class GetSelectorProductHandler
  implements IQueryHandler<GetSelectorProductQuery, GetSelectorProductResult>
{
  @Inject()
  private readonly productQuery: ProductQuery;

  async execute(
    query: GetSelectorProductQuery,
  ): Promise<GetSelectorProductResult> {
    return await this.productQuery.getSelectorProduct(query.tenantId);
  }
}
