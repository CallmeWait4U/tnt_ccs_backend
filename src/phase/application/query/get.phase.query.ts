import { IQuery } from '@nestjs/cqrs';

export class GetPhasesQuery implements IQuery {
  constructor(
    readonly offset: number,
    readonly limit: number,
    readonly searchModel?: any,
  ) {}
}
