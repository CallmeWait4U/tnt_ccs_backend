import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class ProductItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  gender: string;

  @Expose()
  position: string;

  @Expose()
  dayOfBirth: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;
}

export class GetProductsResult implements IQueryResult {
  @Expose()
  items: ProductItem[];

  @Expose()
  total: number;
}
