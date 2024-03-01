import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AccountModel, EmployeeType } from './account.model';

export class AccountDomain {
  async create(id: number, model: AccountModel): Promise<AccountModel> {
    const accountUUID = uuidv4().toString();
    model.id = id;
    model.uuid = accountUUID;
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
    accountCurrent: AccountModel,
    accountUpdate: Partial<AccountModel> & Partial<EmployeeType>,
  ): AccountModel {
    for (const [prop, value] of Object.entries(accountCurrent)) {
      if (prop === 'employee') {
        for (const [propEmp, item] of Object.entries(accountCurrent.employee)) {
          if (propEmp !== 'uuid') {
            accountCurrent.employee[propEmp] = accountUpdate[propEmp]
              ? accountUpdate[propEmp]
              : item;
          }
        }
      } else {
        accountCurrent[prop] = accountUpdate[prop]
          ? accountUpdate[prop]
          : value;
      }
    }
    return accountCurrent;
  }
}
