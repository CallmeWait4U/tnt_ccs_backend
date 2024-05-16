import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class SelectorComplaintByCustomerItem {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  typeComplaintName: string;

  @Expose()
  sentDate: string;
}

export class SelectorComplaintByCustomerResult implements IQueryResult {
  @Expose()
  items: SelectorComplaintByCustomerItem[];

  @Expose()
  total: number;
}
