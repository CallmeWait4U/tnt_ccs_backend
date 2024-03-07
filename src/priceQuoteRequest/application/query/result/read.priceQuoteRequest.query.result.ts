import { IQueryResult } from '@nestjs/cqrs';
import { StatusPriceQuoteRequest } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ProductItemOfPriceQuoteRequestResult {
  @Expose()
  uuid: string;

  @Expose()
  quantity: number;

  @Expose()
  name: string;

  @Expose()
  unit: string;
}
export class ReadPriceQuoteRequestResult implements IQueryResult {
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
  products: ProductItemOfPriceQuoteRequestResult[];
}
