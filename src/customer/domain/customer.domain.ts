import { v4 as uuidv4 } from 'uuid';
import { BusinessType, CustomerModel, IndividualType } from './customer.model';

export class CustomerDomain {
  create(id: number, model: CustomerModel): CustomerModel {
    const customerUUID = uuidv4().toString();
    model.id = id;
    model.uuid = customerUUID;
    model.code = 'KH-' + id.toString().padStart(8, '0');
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
}
