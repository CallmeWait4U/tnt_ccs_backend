import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FirebaseService } from 'libs/firebase.module';
import { ProductQuery } from 'src/product/infrastructure/product.query';
import { ListProductQuery } from '../query/list.product.query';
import { ListProductResult } from '../query/result/list.product.query.result';

@QueryHandler(ListProductQuery)
export class GetProductsHandler
  implements IQueryHandler<ListProductQuery, ListProductResult>
{
  @Inject()
  private readonly firebase: FirebaseService;

  constructor(private readonly productQuery: ProductQuery) {}

  async execute(query: ListProductQuery): Promise<ListProductResult> {
    const result = await this.productQuery.listProduct(
      query.tenantId,
      query.offset,
      query.limit,
      query.searchModel,
    );
    result.items = await Promise.all(
      result.items.map(async (item) => {
        item.images = await Promise.all(
          item.images.map(async (image) => {
            image.url = await this.firebase.getAuthenticatedFileUrl(image.url);
            return image;
          }),
        );
        return item;
      }),
    );
    return result;
  }
}
