import { IQuery } from '@nestjs/cqrs';

export class GetCustomersByEmployeeQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly accountUUID: string,
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
