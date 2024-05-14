import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class CountCustomersByLocationItem {
  @Expose()
  city: string;

  @Expose()
  numCustomer: number;
}

export class CountCustomersByLocationResult implements IQueryResult {
  @Expose()
  items: CountCustomersByLocationItem[];

  @Expose()
  total: number;
}
