import { IQuery } from '@nestjs/cqrs';

export class GetComplaintsQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly offset: number,
    readonly limit: number,
    readonly customerUUID?: string,
    readonly searchModel?: any,
  ) {}
}
