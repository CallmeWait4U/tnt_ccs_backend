import { IQueryResult } from '@nestjs/cqrs';
import { StatusBill } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ProductItemOfBill {
  @Expose()
  uuid: string;

  @Expose()
  fixedPrice: number;

  @Expose()
  quantity: number;

  @Expose()
  name: string;
}
export class ReadBillResult implements IQueryResult {
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

  @Expose()
  total: number;

  @Expose()
  products: ProductItemOfBill[];
}
