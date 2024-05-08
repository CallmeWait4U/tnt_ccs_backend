import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAccountForCustomerHandler } from './application/command-handler/create.account.for.customer.handler';
import { CreateAccountHandler } from './application/command-handler/create.account.handler';
import { DeleteAccountHandler } from './application/command-handler/delete.account.handler';
import { UpdateAccountHandler } from './application/command-handler/update.account.handler';
import { GetAccountsHandler } from './application/query-handler/get.accounts.handler';
import { ReadAccountHandler } from './application/query-handler/read.account.handler';
import { AccountDomain } from './domain/account.domain';
import { AccountFactory } from './infrastructure/account.factory';
import { AccountQuery } from './infrastructure/account.query';
import { AccountRepository } from './infrastructure/account.repository';
import { AccountController } from './presentation/account.controller';

const application = [
  GetAccountsHandler,
  ReadAccountHandler,
  CreateAccountHandler,
  CreateAccountForCustomerHandler,
  UpdateAccountHandler,
  DeleteAccountHandler,
];

const infrastructure = [AccountRepository, AccountQuery, AccountFactory];

const domain = [AccountDomain];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [AccountController],
})
export class AccountModule {}
