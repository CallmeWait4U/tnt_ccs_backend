import { IQuery } from '@nestjs/cqrs';

export class GetTasksByCustomerQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly customerUUID: string,
    readonly history: boolean,
  ) {}
}
