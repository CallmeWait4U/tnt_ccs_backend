import { Prisma, Product } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { ProductModel } from '../domain/product.model';

type ProductEntity = Prisma.ProductGetPayload<{}>;

export class ProductFactory extends BaseFactory {
  createProductModel(
    product: ProductEntity | Product | Partial<Product> | null,
  ) {
    if (!product) return null;

    return this.createModel(ProductModel, {
      ...product,
    });
  }

  createProductModels(
    products: ProductEntity[] | Product[] | Partial<Product>[] | null,
  ) {
    if (!products) return null;
    return products.map((product) => this.createProductModel(product));
  }
}
