import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { SignInResult } from '../application/query/result/signin.query.result';
import { AccountModel, TenantModel } from '../domain/auth.model';
import { AuthFactory } from './auth.factory';

export class AuthRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly authFactory: AuthFactory;

  async createTenant(tenant: TenantModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = tenant;
    await this.prisma.tenant.create({ data });
    return tenant.tenantId;
  }

  async createAccount(account: AccountModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, permissions, employee, ...data } = account;
    await this.prisma.account.create({ data });
    await this.prisma.employee.create({
      data: { ...employee, account: { connect: { uuid: account.uuid } } },
    });
    return account.tenantId;
  }

  async updateAccount(
    account: AccountModel,
    domain: string,
    signIn?: boolean,
  ): Promise<SignInResult | { accessToken: string; refreshToken: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, permissions, employee, ...data } = account;
    const res = await this.prisma.account.update({
      data,
      where: { uuid },
      include: {
        permissions: true,
      },
    });
    return signIn
      ? plainToClass(
          SignInResult,
          {
            ...res,
            permissions: res.permissions.map(
              (permission) => permission.namePermission,
            ),
          },
          { excludeExtraneousValues: true },
        )
      : {
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
        };
  }

  async updatePassword(account: AccountModel): Promise<string> {
    const updated = await this.prisma.account.update({
      data: {
        password: account.password,
      },
      where: { uuid: account.uuid },
    });
    return updated.uuid;
  }

  async getTenantByDomain(domain: string): Promise<TenantModel | null> {
    const entity = await this.prisma.tenant.findUnique({
      where: { domain },
    });
    return this.authFactory.createTenantModel(entity);
  }

  async getAccount(
    username: string,
    tenantId: string,
  ): Promise<AccountModel | null> {
    const entity = await this.prisma.account.findUnique({
      where: { username, tenantId },
    });
    return this.authFactory.createAccountModel(entity);
  }

  async getAccountUUID(
    uuid: string,
    tenantId: string,
  ): Promise<AccountModel | null> {
    const entity = await this.prisma.account.findUnique({
      where: { uuid, tenantId },
    });
    return this.authFactory.createAccountModel(entity);
  }
}
