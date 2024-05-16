import { IQuery } from '@nestjs/cqrs';

export class GetPriceQuotesByCustomerQuery implements IQuery {
  constructor(
    readonly customerUUID: string,
    readonly tenantId: string,
  ) {}
}
