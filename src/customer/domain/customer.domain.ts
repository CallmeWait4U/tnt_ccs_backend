import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BusinessType, CustomerModel, IndividualType } from './customer.model';

export class CustomerDomain {
  create(model: CustomerModel): CustomerModel {
    const customerUUID = uuidv4().toString();
    model.uuid = customerUUID;
    model.code = 'KH-';
    model.receiveMail = false;
    return model;
  }

  update(
    customerCurrent: CustomerModel,
    customerUpdate: Partial<CustomerModel> &
      Partial<BusinessType> &
      Partial<IndividualType>,
  ): CustomerModel {
    for (const [prop, value] of Object.entries(customerCurrent)) {
      if (prop === 'business' && customerCurrent[prop]) {
        for (const [propBusi, item] of Object.entries(
          customerCurrent.business,
        )) {
          customerCurrent.business[propBusi] = customerUpdate[propBusi]
            ? customerUpdate[propBusi]
            : item;
        }
      } else if (prop === 'individual' && customerCurrent[prop]) {
        for (const [propIndi, item] of Object.entries(
          customerCurrent.individual,
        )) {
          customerCurrent.individual[propIndi] = customerUpdate[propIndi]
            ? customerUpdate[propIndi]
            : item;
        }
      } else {
        customerCurrent[prop] = customerUpdate[prop]
          ? customerUpdate[prop]
          : value;
      }
    }
    return customerCurrent;
  }

  checkCustomer(customer: CustomerModel[] | CustomerModel | null) {
    if (!customer)
      throw new HttpException('Customers do not exist', HttpStatus.BAD_REQUEST);
  }
}
