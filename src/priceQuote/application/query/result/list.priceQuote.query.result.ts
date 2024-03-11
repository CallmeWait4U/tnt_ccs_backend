import { IQueryResult } from '@nestjs/cqrs';
import { StatusPriceQuote } from '@prisma/client';
import { Expose } from 'class-transformer';

export class PriceQuoteItem {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: Date;

  @Expose()
  status: StatusPriceQuote;

  @Expose()
  sentDate: Date;

  @Expose()
  customerUUID: string;
}

export class GetPriceQuotesResult implements IQueryResult {
  @Expose()
  items: PriceQuoteItem[];

  @Expose()
  total: number;
}
