import { Account, Prisma } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import {
  AccountModel,
  CustomerType,
  EmployeeType,
} from '../domain/account.model';

type AccountEntity = Prisma.AccountGetPayload<{
  include: {
    customer: true;
    employee: true;
  };
}>;

export class AccountFactory extends BaseFactory {
  createAccountModel(
    account: AccountEntity | Account | Partial<Account> | null,
  ) {
    if (!account) return null;
    let customer = {};
    let employee = {};
    if (account.type === 'CUSTOMER') {
      customer = this.createModel(CustomerType, { ...account });
    } else {
      employee = this.createModel(EmployeeType, { ...account });
    }
    return this.createModel(AccountModel, {
      ...account,
      customer: 'customer' in account ? account.customer : customer,
      employee: 'employee' in account ? account.employee : employee,
    });
  }

  createAccountModels(
    accounts: AccountEntity[] | Account[] | Partial<Account>[] | null,
  ) {
    if (!accounts) return null;
    return accounts.map((account) => this.createAccountModel(account));
  }
}
