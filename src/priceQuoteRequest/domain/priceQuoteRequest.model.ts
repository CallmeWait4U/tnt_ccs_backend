import { StatusPriceQuoteRequest } from '@prisma/client';
import { Expose } from 'class-transformer';

class ProductItemOfPriceQuoteRequestModel {
  @Expose()
  uuid: string;

  @Expose()
  quantity: number;
}
export class PriceQuoteRequestModel {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: Date;

  @Expose()
  status: StatusPriceQuoteRequest;

  @Expose()
  sentDate: Date;

  @Expose()
  customerUUID: string;

  @Expose()
  products: ProductItemOfPriceQuoteRequestModel[];
}
