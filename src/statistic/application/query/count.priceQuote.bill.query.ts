import { IQuery } from '@nestjs/cqrs';

export class CountPriceQuoteAndBillQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
