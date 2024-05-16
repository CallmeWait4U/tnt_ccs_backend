import { IQuery } from '@nestjs/cqrs';

export class ReadPriceQuoteByCustomerQuery implements IQuery {
  constructor(
    readonly uuid: string,
    readonly tenantId: string,
    readonly accountUUID: string,
  ) {}
}
