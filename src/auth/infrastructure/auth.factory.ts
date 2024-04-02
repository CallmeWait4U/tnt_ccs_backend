import { Account, Prisma, Tenant } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { AccountModel, EmployeeType, TenantModel } from '../domain/auth.model';

type AccountEntity = Prisma.AccountGetPayload<{
  include: {
    employee: true;
    permissions: true;
  };
}>;

export class AuthFactory extends BaseFactory {
  createTenantModel(tenant: Tenant | Partial<Tenant> | null) {
    if (!tenant) return null;
    return this.createModel(TenantModel, tenant);
  }

  createTenantModels(tenants: Tenant[] | Partial<Tenant>[] | null) {
    if (!tenants) return null;
    return tenants.map((tenant) => this.createModel(TenantModel, tenant));
  }

  createAccountModel(
    account: AccountEntity | Account | Partial<Account> | null,
  ) {
    if (!account) return null;
    const employee = this.createModel(EmployeeType, { ...account });
    return this.createModel(AccountModel, {
      ...account,
      employee: employee,
    });
  }

  createAccountModels(
    accounts: AccountEntity[] | Account[] | Partial<Account>[] | null,
  ) {
    if (!accounts) return null;
    return accounts.map((account) => this.createAccountModel(account));
  }
}
