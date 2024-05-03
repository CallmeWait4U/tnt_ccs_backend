import { Prisma } from '@prisma/client';
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
    employees: true;
  };
}>;

export class CustomerFactory extends BaseFactory {
  createCustomerModel(
    customer: CustomerEntity | Partial<CustomerEntity> | null,
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
    const employees: { uuid: string }[] = [];
    if ('employeeUUIDs' in customer && Array.isArray(customer.employeeUUIDs)) {
      customer.employeeUUIDs?.forEach((uuid) => {
        employees.push({ uuid });
      });
    } else {
      customer.employees?.forEach((employee) => {
        employees.push({ uuid: employee.uuid });
      });
    }
    return this.createModel(CustomerModel, {
      ...customer,
      employees,
      business: 'business' in customer ? customer.business : business,
      individual: 'individual' in customer ? customer.individual : individual,
    });
  }

  createCustomerModels(
    customers: CustomerEntity[] | Partial<CustomerEntity>[] | null,
  ) {
    if (!customers) return null;
    return customers.map((customer) => this.createCustomerModel(customer));
  }
}
