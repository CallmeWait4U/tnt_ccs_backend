import { IQuery } from '@nestjs/cqrs';

export class GetComplaintsByCustomerQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly offset: number,
    readonly limit: number,
    readonly accountUUID: string,
    readonly searchModel?: any,
  ) {}
}
