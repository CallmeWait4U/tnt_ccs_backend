import { IQuery } from '@nestjs/cqrs';

export class FindAllQuery implements IQuery {
  constructor(
    readonly searchModel?: any,
    readonly offset?: number,
    readonly limit?: number,
  ) {}
}
