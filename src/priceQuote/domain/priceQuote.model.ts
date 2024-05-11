import { StatusPriceQuote } from '@prisma/client';
import { Expose } from 'class-transformer';

class productItem {
  @Expose()
  uuid: string;

  @Expose()
  negotiatedPrice: number;

  @Expose()
  quantity: number;
}
export class PriceQuoteModel {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: Date;

  @Expose()
  effectiveDate: Date;

  @Expose()
  status: StatusPriceQuote;

  @Expose()
  sentDate: Date;

  @Expose()
  customerUUID: string;

  @Expose()
  employeeUUID: string;

  @Expose()
  priceQuoteRequestUUID: string;

  @Expose()
  tenantId: string;

  @Expose()
  products: productItem[];
}
