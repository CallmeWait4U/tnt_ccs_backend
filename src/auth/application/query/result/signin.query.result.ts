import { IQueryResult } from '@nestjs/cqrs';
import { TypeAccount } from '@prisma/client';
import { Expose } from 'class-transformer';

export class SignInResult implements IQueryResult {
  @Expose()
  accessToken: string;
  @Expose()
  refreshToken: string;
  @Expose()
  type?: TypeAccount;
  @Expose()
  permissions?: string[];
}
