import { IQuery } from '@nestjs/cqrs';

export class GetBillsQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly accountUUID: string,
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
