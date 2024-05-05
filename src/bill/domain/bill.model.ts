import { StatusBill } from '@prisma/client';
import { Expose } from 'class-transformer';

class ProductItemOfBillModel {
  @Expose()
  uuid: string;

  @Expose()
  fixedPrice: number;

  @Expose()
  quantity: number;
}
export class BillModel {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: Date;

  @Expose()
  status: StatusBill;

  @Expose()
  customerUUID: string;

  @Expose()
  priceQuoteUUID: string;

  @Expose()
  products: ProductItemOfBillModel[];
}
