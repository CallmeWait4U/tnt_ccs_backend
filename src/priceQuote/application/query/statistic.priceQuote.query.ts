import { IQuery } from '@nestjs/cqrs';

export class StatisticPriceQuoteQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
