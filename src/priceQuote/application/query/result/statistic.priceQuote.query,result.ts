import { Expose } from 'class-transformer';

export class StatisticPriceQuoteQueryResult {
  @Expose()
  percerChangeToBill: number;
}
