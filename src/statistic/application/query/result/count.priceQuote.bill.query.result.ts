import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class CountPriceQuoteAndBillResult implements IQueryResult {
  @Expose()
  numPriceQuotes: number;

  @Expose()
  ratioPreviousMonthPriceQuote: number;

  @Expose()
  numBills: number;

  @Expose()
  ratioPreviousMonthBill: number;
}
