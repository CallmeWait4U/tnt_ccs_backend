import { Expose } from 'class-transformer';
export class ComplaintResult {
  @Expose()
  status: string;
  @Expose()
  quantity: number;
}
export class StatisticPriceQuoteQueryResult {
  @Expose()
  percerChangeToBill: number;
  @Expose()
  billQuantity: number;
  @Expose()
  complaintQuantity: number;
  @Expose()
  complaintStatistic: ComplaintResult[];
}
