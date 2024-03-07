import { IQueryResult } from '@nestjs/cqrs';
import { StatusBill } from '@prisma/client';
import { Expose } from 'class-transformer';

export class BillItem {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: Date;

  @Expose()
  status: StatusBill;

  @Expose()
  sentDate: Date;

  @Expose()
  customerUUID: string;
}

export class GetBillsResult implements IQueryResult {
  @Expose()
  items: BillItem[];

  @Expose()
  total: number;
}
