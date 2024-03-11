import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeAccount } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AccountModel, TenantModel } from './auth.model';

export class AuthDomain {
  createTenant(model: TenantModel): TenantModel {
    const tenantUUID = uuidv4().toString();
    const tenantID = uuidv4().toString();
    model.uuid = tenantUUID;
    model.tenantId = tenantID;
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
}
