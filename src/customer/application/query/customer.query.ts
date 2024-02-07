import { IQuery } from '@nestjs/cqrs';

export class ListCustomerQuery implements IQuery {
  constructor(
    readonly searchModel?: any,
    readonly offset?: number,
    readonly limit?: number,
  ) {}
}
export class ReadCustomerQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
