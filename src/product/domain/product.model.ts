import { Expose } from 'class-transformer';

export class ProductModel {
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
}
