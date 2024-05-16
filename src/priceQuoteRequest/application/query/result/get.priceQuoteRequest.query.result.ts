import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetPriceQuoteRequestByCustomerItem {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: Date;
}

export class GetPriceQuoteRequestByCustomerResult implements IQueryResult {
  @Expose()
  items: GetPriceQuoteRequestByCustomerItem[];
}
