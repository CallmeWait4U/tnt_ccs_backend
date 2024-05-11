import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class CountCustomerFollowingSourceItem {
  @Expose()
  sourceName: number;

  @Expose()
  numCustomers: number;
}

export class CountCustomerFollowingSourceResult implements IQueryResult {
  @Expose()
  items: CountCustomerFollowingSourceItem[];

  @Expose()
  total: number;
}
