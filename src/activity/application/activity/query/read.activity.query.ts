import { IQuery } from '@nestjs/cqrs';

export class ReadActivityQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly uuid: string,
  ) {}
}
