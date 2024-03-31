import { Expose } from 'class-transformer';

export class ProductOptionItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;
}

export class ListProductOptionsResult {
  @Expose()
  items: ProductOptionItem[];

  @Expose()
  total: number;
}
