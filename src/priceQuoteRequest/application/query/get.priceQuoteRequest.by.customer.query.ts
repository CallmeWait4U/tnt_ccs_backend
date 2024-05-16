import { IQuery } from '@nestjs/cqrs';

export class GetPriceQuoteRequestByCustomerQuery implements IQuery {
  constructor(
    readonly customerUUID: string,
    readonly tenantId: string,
  ) {}
}
