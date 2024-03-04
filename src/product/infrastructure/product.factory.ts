import { Prisma, Product } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import {
  CustomerType,
  EmployeeType,
  ProductModel,
} from '../domain/product.model';

type ProductEntity = Prisma.ProductGetPayload<{
  include: {
    customer: true;
    employee: true;
  };
}>;

export class ProductFactory extends BaseFactory {
  createProductModel(
    account: ProductEntity | Product | Partial<Product> | null,
  ) {
    if (!account) return null;
    let customer = {};
    let employee = {};
    if (account.type === 'CUSTOMER') {
      customer = this.createModel(CustomerType, { ...account });
    } else {
      employee = this.createModel(EmployeeType, { ...account });
    }
    return this.createModel(ProductModel, {
      ...account,
      customer: 'customer' in account ? account.customer : customer,
      employee: 'employee' in account ? account.employee : employee,
    });
  }

  createProductModels(
    accounts: ProductEntity[] | Product[] | Partial<Product>[] | null,
  ) {
    if (!accounts) return null;
    return accounts.map((account) => this.createProductModel(account));
  }
}
