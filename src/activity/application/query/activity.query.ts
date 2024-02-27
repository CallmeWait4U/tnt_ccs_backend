import { IQuery } from '@nestjs/cqrs';

export class ListActivityQuery implements IQuery {
  constructor(
    readonly searchModel?: any,
    readonly offset?: number,
    readonly limit?: number,
  ) {}
}
export class ReadActivityQuery implements IQuery {
  constructor(readonly uuid: string) {}
}

export class ListTaskQuery implements IQuery {
  constructor(
    readonly searchModel?: any,
    readonly activityUUID?: string,
    readonly offset?: number,
    readonly limit?: number,
  ) {}
}

export class ReadTaskQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
