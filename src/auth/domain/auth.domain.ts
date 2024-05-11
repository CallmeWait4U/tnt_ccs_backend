import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeAccount } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { User } from 'interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { jwtConfig } from '../presentation/jwt/jwt.config';
import { AccountModel, TenantModel } from './auth.model';

export class AuthDomain {
  @Inject()
  private readonly jwtService: JwtService;

  createTenant(model: TenantModel, domainList: string[]): TenantModel {
    const tenantUUID = uuidv4().toString();
    const tenantID = uuidv4().toString();
    model.uuid = tenantUUID;
    model.createdDate = new Date();
    model.tenantId = tenantID;
    domainList.forEach((domain) => {
      if (domain === model.domain) {
        throw new HttpException(
          'Domain name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    return model;
  }

  async createAccount(
    model: AccountModel,
    passwordConfirm: string,
  ): Promise<AccountModel> {
    if (model.password !== passwordConfirm) {
      throw new HttpException('Wrong Comfirm', HttpStatus.BAD_REQUEST);
    }
    const accountUUID = uuidv4().toString();
    model.uuid = accountUUID;
    const salt = await bcrypt.genSalt();
    model.password = await bcrypt.hash(model.password, salt);
    model.type = TypeAccount.ADMIN;
    return model;
  }

  checkTenant(model: TenantModel): void {
    if (!model)
      throw new HttpException(
        'Domain name does not exist',
        HttpStatus.BAD_REQUEST,
      );
  }

  async signIn(
    model: AccountModel,
    password: string,
    domain: string,
  ): Promise<AccountModel> {
    if (!model) {
      throw new HttpException('Wrong Username', HttpStatus.BAD_REQUEST);
    }
    const match = await bcrypt.compare(password, model.password);
    if (!match) {
      throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.generateTokenPair(model, domain);
    model.accessToken = tokens.accessToken;
    model.refreshToken = tokens.refreshToken;
    return model;
  }

  async changePassword(
    model: AccountModel,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<AccountModel> {
    const match = await bcrypt.compare(oldPassword, model.password);
    if (!match) {
      throw new HttpException('Old password wrong', HttpStatus.BAD_REQUEST);
    }
    if (newPassword !== confirmPassword) {
      throw new HttpException('Wrong Comfirm', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt();
    model.password = await bcrypt.hash(newPassword, salt);
    return model;
  }

  signOut(model: AccountModel): AccountModel {
    model.accessToken = null;
    model.refreshToken = null;
    return model;
  }

  async refresh(model: AccountModel, domain: string): Promise<AccountModel> {
    if (!model || !model.refreshToken) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
    const tokens = await this.generateTokenPair(model, domain);
    model.accessToken = tokens.accessToken;
    model.refreshToken = tokens.refreshToken;
    return model;
  }

  private async generateTokenPair(
    account: AccountModel,
    domain: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = plainToClass(
      User,
      { ...account, domain },
      { excludeExtraneousValues: true },
    );
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...user },
        {
          secret: jwtConfig.access,
          expiresIn: jwtConfig.expiresIn.access,
        },
      ),
      this.jwtService.signAsync(
        { ...user },
        {
          secret: jwtConfig.refresh,
          expiresIn: jwtConfig.expiresIn.refresh,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
