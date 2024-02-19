import { IQuery } from '@nestjs/cqrs';

export class ListEmployeeQuery implements IQuery {
  constructor(
    readonly searchModel?: any,
    readonly offset?: number,
    readonly limit?: number,
  ) {}
}
export class ReadEmployeeQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
