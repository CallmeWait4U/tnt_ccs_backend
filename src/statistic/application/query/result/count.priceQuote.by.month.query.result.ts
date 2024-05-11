import { Expose } from 'class-transformer';

export class CountPriceQuoteByMonthItem {
  @Expose()
  numPriceQuotes: number;

  @Expose()
  numPriceQuotesConvertBill: number;

  @Expose()
  time: number;
}

export class CountPriceQuoteByMonthResult {
  @Expose()
  items: CountPriceQuoteByMonthItem[];

  @Expose()
  total: number;
}
