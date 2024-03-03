import { IQuery } from '@nestjs/cqrs';

export class GetTasksQuery implements IQuery {
  constructor(
    readonly activityUUID: string,
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
