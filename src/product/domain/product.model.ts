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
  unit: string;

  @Expose()
  description: string;

  @Expose()
  images: ImageProductModel[];

  @Expose()
  tenantId: string;
}
export class ImageProductModel {
  @Expose()
  uuid: string;

  @Expose()
  url: string;
}
