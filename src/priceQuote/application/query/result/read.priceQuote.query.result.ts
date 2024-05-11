import { IQueryResult } from '@nestjs/cqrs';
import { StatusPriceQuote } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ProductItemOfPriceQuote {
  @Expose()
  uuid: string;

  @Expose()
  negotiatedPrice: number;

  @Expose()
  quantity: number;

  @Expose()
  name: string;

  @Expose()
  unit: string;
}
export class ReadPriceQuoteResult implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  createdDate: Date;

  @Expose()
  effectivceDate: Date;

  @Expose()
  status: StatusPriceQuote;

  @Expose()
  sentDate: Date;

  @Expose()
  customerUUID: string;

  @Expose()
  total: number;

  @Expose()
  products: ProductItemOfPriceQuote[];
}
