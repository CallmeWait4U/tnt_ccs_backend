import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class ImageProduct {
  @Expose()
  uuid: string;

  @Expose()
  url: string;
}
export class ReadProductResult implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  features: string;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  unite: string;

  @Expose()
  description: string;

  @Expose()
  images: ImageProduct[];
}
