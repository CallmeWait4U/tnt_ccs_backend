import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class PriceQuoteItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  gender: string;

  @Expose()
  position: string;

  @Expose()
  dayOfBirth: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;
}

export class GetPriceQuotesResult implements IQueryResult {
  @Expose()
  items: PriceQuoteItem[];

  @Expose()
  total: number;
}
