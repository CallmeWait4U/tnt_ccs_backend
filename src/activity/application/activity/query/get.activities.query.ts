import { IQuery } from '@nestjs/cqrs';

export class GetActivitiesQuery implements IQuery {
  constructor(
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
