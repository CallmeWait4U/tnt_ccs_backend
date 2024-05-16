import { IQueryResult } from '@nestjs/cqrs';
import { StatusBill } from '@prisma/client';
import { Expose } from 'class-transformer';

export class GetBillByCustomerItem {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: string;

  @Expose()
  status: StatusBill;
}

export class GetBillByCustomerResult implements IQueryResult {
  @Expose()
  items: GetBillByCustomerItem[];

  @Expose()
  total: number;
}
