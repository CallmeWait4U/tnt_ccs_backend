import { IQueryResult } from '@nestjs/cqrs';
import { StatusPriceQuote } from '@prisma/client';
import { Expose } from 'class-transformer';

export class GetPriceQuotesByCustomerItem {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: Date;

  @Expose()
  effectiveDate: Date;

  @Expose()
  status: StatusPriceQuote;
}

export class GetPriceQuotesByCustomerResult implements IQueryResult {
  @Expose()
  items: GetPriceQuotesByCustomerItem[];
}
