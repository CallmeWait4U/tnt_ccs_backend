import { v4 as uuidv4 } from 'uuid';
import { ProductModel } from './product.model';

export class ProductDomain {
  async create(model: ProductModel): Promise<ProductModel> {
    const productUUID = uuidv4().toString();
    model.uuid = productUUID;
    return model;
  }

  update(
    productCurrent: ProductModel,
    productUpdate: Partial<ProductModel>,
  ): ProductModel {
    for (const [prop, value] of Object.entries(productCurrent)) {
      productCurrent[prop] = productUpdate[prop] ? productUpdate[prop] : value;
    }
    return productCurrent;
  }
}
