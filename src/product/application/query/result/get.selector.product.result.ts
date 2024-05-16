import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetSelectorProductItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  unit: string;
}

export class GetSelectorProductResult implements IQueryResult {
  @Expose()
  items: GetSelectorProductItem[];

  @Expose()
  total: number;
}
