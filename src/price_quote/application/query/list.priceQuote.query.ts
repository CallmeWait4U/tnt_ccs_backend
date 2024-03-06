import { IQuery } from '@nestjs/cqrs';
import { TypePriceQuote } from '@prisma/client';

export class GetPriceQuotesQuery implements IQuery {
  constructor(
    readonly offset: number,
    readonly limit: number,
    readonly type: TypePriceQuote,
    readonly searchModel?: any,
  ) {}
}
