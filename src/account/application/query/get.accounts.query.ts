import { IQuery } from '@nestjs/cqrs';
import { TypeAccount } from '@prisma/client';

export class GetAccountsQuery implements IQuery {
  constructor(
    readonly offset: number,
    readonly limit: number,
    readonly type: TypeAccount,
    readonly searchModel?: any,
  ) {}
}
