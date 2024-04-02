import { IQuery } from '@nestjs/cqrs';

export class GetTasksByCustomerQuery implements IQuery {
  constructor(
    readonly customerUUID: string,
    readonly history: boolean,
  ) {}
}
