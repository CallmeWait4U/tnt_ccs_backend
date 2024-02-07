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
  source?: number;

  @Expose()
  city?: number;

  @Expose()
  district?: string;

  @Expose()
  detailAddress?: string;

  @Expose()
  email?: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  description?: string;

  @Expose()
  receiveMail?: string;
}

export class ListCustomersResult implements IQueryResult {
  @Expose()
  items: CustomerItem[];

  @Expose()
  total: number;
}
