import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FirebaseService } from 'libs/firebase.module';
import { ProductQuery } from 'src/product/infrastructure/product.query';
import { ReadProductQuery } from '../query/read.product.query';
import { ReadProductResult } from '../query/result/read.product.query.result';

@QueryHandler(ReadProductQuery)
export class ReadProductHandler
  implements IQueryHandler<ReadProductQuery, ReadProductResult>
{
  @Inject()
  private readonly firebase: FirebaseService;

  constructor(private readonly productQuery: ProductQuery) {}

  async execute(query: ReadProductQuery): Promise<ReadProductResult> {
    const result = await this.productQuery.readProduct(
      query.uuid,
      query.tenantId,
    );
    if (result?.images) {
      result.images = await Promise.all(
        result.images.map(async (image) => {
          image.url = await this.firebase.getAuthenticatedFileUrl(image.url);
          return image;
        }),
      );
    }
    return result;
  }
}
