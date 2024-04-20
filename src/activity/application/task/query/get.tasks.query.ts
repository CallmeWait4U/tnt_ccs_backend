import { IQuery } from '@nestjs/cqrs';

export class GetTasksQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly activityUUID: string,
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
