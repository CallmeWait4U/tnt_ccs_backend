import { Customer, Prisma } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import {
  BusinessType,
  CustomerModel,
  IndividualType,
} from '../domain/customer.model';

type CustomerEntity = Prisma.CustomerGetPayload<{
  include: {
    business: true;
    individual: true;
  };
}>;

export class CustomerFactory extends BaseFactory {
  createCustomerModel(
    customer: CustomerEntity | Customer | Partial<Customer> | null,
  ) {
    if (!customer) return null;
    let business = {};
    let individual = {};
    if (customer.isBusiness) {
      business = this.createModel(BusinessType, {
        ...customer,
      });
    } else {
      individual = this.createModel(IndividualType, {
        ...customer,
      });
    }
    return this.createModel(CustomerModel, {
      ...customer,
      business: 'business' in customer ? customer.business : business,
      individual: 'individual' in customer ? customer.individual : individual,
    });
  }

  createCustomerModels(
    customers: CustomerEntity[] | Customer[] | Partial<Customer>[] | null,
  ) {
    if (!customers) return null;
    return customers.map((customer) => this.createCustomerModel(customer));
  }
}
