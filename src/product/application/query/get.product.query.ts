import { IQuery } from '@nestjs/cqrs';
import { TypeProduct } from '@prisma/client';

export class GetProductsQuery implements IQuery {
  constructor(
    readonly offset: number,
    readonly limit: number,
    readonly type: TypeProduct,
    readonly searchModel?: any,
  ) {}
}
