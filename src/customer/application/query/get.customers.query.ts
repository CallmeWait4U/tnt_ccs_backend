import { IQuery } from '@nestjs/cqrs';

export class GetCustomersQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
