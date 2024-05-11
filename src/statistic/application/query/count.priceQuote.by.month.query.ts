import { IQuery } from '@nestjs/cqrs';
import { OptionsStatisticEnum } from 'interfaces/options.statistic.enum';

export class CountPriceQuoteByMonthQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly option: OptionsStatisticEnum,
  ) {}
}
