import { IQueryResult } from '@nestjs/cqrs';
import { StatusPriceQuoteRequest } from '@prisma/client';
import { Expose } from 'class-transformer';

export class PriceQuoteRequestItem {
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
}

export class GetPriceQuoteRequestsResult implements IQueryResult {
  @Expose()
  items: PriceQuoteRequestItem[];

  @Expose()
  total: number;
}
