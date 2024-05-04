import { IQuery } from '@nestjs/cqrs';

export class ListChatCustomerQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly customerUUID: string,
    readonly offset: number,
    readonly limit: number,
  ) {}
}
