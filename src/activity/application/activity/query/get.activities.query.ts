import { IQuery } from '@nestjs/cqrs';

export class GetActivitiesQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
