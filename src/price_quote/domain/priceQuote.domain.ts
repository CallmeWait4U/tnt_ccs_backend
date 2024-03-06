import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeType, PriceQuoteModel } from './priceQuote.model';

export class PriceQuoteDomain {
  async create(id: number, model: PriceQuoteModel): Promise<PriceQuoteModel> {
    const priceQuoteUUID = uuidv4().toString();
    model.id = id;
    model.uuid = priceQuoteUUID;
    if (model.type === 'CUSTOMER') {
      model.username = model.customer.isBusiness
        ? model.customer.business.representativeEmail
        : model.customer.individual.email;
    } else {
      model.username = model.employee.email;
    }
    const salt = await bcrypt.genSalt();
    model.password = await bcrypt.hash('123456', salt);
    return model;
  }

  update(
    priceQuoteCurrent: PriceQuoteModel,
    priceQuoteUpdate: Partial<PriceQuoteModel> & Partial<EmployeeType>,
  ): PriceQuoteModel {
    for (const [prop, value] of Object.entries(priceQuoteCurrent)) {
      if (prop === 'employee') {
        for (const [propEmp, item] of Object.entries(
          priceQuoteCurrent.employee,
        )) {
          if (propEmp !== 'uuid') {
            priceQuoteCurrent.employee[propEmp] = priceQuoteUpdate[propEmp]
              ? priceQuoteUpdate[propEmp]
              : item;
          }
        }
      } else {
        priceQuoteCurrent[prop] = priceQuoteUpdate[prop]
          ? priceQuoteUpdate[prop]
          : value;
      }
    }
    return priceQuoteCurrent;
  }
}
