import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'libs/database.module';
import { AccountModel, TenantModel } from '../domain/auth.model';
import { jwtConfig } from '../presentation/jwt/jwt.config';

export class AuthRepository {
  @Inject()
  private readonly jwtService: JwtService;
  @Inject()
  private readonly prisma: PrismaService;

  async createTenant(tenant: TenantModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = tenant;
    await this.prisma.tenant.create({ data });
    return tenant.tenantId;
  }

  async createAccount(account: AccountModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, employee, ...data } = account;
    await this.prisma.account.create({ data });
    await this.prisma.employee.create({
      data: { ...employee, account: { connect: { uuid: account.uuid } } },
    });
    return account.uuid;
  }

  async signIn(
    account: Account,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.generateTokenPair(account);
    const salt = await bcrypt.genSalt();
    const hashRefreshToken = await bcrypt.hash(tokens.refreshToken, salt);
    await this.prisma.account.update({
      data: {
        accessToken: tokens.accessToken,
        refreshToken: hashRefreshToken,
      },
      where: { uuid: account.uuid },
    });
    return tokens;
  }

  async signOut(uuid: string): Promise<void> {
    await this.prisma.account.update({
      data: {
        accessToken: null,
        refreshToken: null,
      },
      where: { uuid },
    });
  }

  async refresh(
    account: Account,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.generateTokenPair(account);
    await this.prisma.account.update({
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      where: { uuid: account.uuid },
    });
    return tokens;
  }

  async generateTokenPair(
    account: Account,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          uuid: account.uuid,
          username: account.username,
        },
        {
          secret: jwtConfig.access,
          expiresIn: jwtConfig.expiresIn.access,
        },
      ),
      this.jwtService.signAsync(
        {
          uuid: account.uuid,
          username: account.username,
        },
        {
          secret: jwtConfig.refresh,
          expiresIn: jwtConfig.expiresIn.refresh,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
