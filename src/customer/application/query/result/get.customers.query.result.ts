import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class CustomerItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  isBusiness: boolean;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  employees: { uuid: string; name: string }[];

  @Expose()
  source: number;

  @Expose()
  phaseName: string;
}

export class GetCustomersResult implements IQueryResult {
  @Expose()
  items: CustomerItem[];

  @Expose()
  total: number;
}
