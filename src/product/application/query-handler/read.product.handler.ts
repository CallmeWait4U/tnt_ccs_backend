import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductQuery } from 'src/account/infrastructure/account.query';
import { ReadProductQuery } from '../query/read.product.query';
import { ReadProductResult } from '../query/result/read.product.query.result';

@QueryHandler(ReadProductQuery)
export class ReadProductHandler
  implements IQueryHandler<ReadProductQuery, ReadProductResult>
{
  constructor(private readonly accountQuery: ProductQuery) {}

  async execute(query: ReadProductQuery): Promise<ReadProductResult> {
    return await this.accountQuery.readProduct(query.uuid);
  }
}
