import { IQuery } from '@nestjs/cqrs';

export class GetPriceQuoteRequestsQuery implements IQuery {
  constructor(
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
