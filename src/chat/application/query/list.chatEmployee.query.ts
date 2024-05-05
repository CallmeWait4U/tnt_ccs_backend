import { IQuery } from '@nestjs/cqrs';

export class ListChatEmployeeQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly accountUUID: string,
    readonly receiverUUID: string,
    readonly offset: number,
    readonly limit: number,
  ) {}
}
