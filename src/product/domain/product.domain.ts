import { v4 as uuidv4 } from 'uuid';
import { ProductModel } from './product.model';

export class ProductDomain {
  async create(model: ProductModel): Promise<ProductModel> {
    model.uuid = uuidv4().toString();
    if (model.images) {
      model.images.forEach((image) => {
        image.uuid = uuidv4().toString();
      });
    }
    return model;
  }

  update(
    productCurrent: ProductModel,
    productUpdate: Partial<any>,
  ): ProductModel {
    for (const [prop, value] of Object.entries(productCurrent)) {
      productCurrent[prop] = productUpdate[prop] ? productUpdate[prop] : value;
    }
    return productCurrent;
  }
}
