import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountDomain } from 'src/account/domain/account.domain';
import { AccountFactory } from 'src/account/infrastructure/account.factory';
import { AccountRepository } from 'src/account/infrastructure/account.repository';
import { CreateAccountCommand } from '../command/create.account.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand, string>
{
  @Inject()
  private readonly accountRepository: AccountRepository;
  @Inject()
  private readonly accountFactory: AccountFactory;
  @Inject()
  private readonly accountDomain: AccountDomain;

  async execute(command: CreateAccountCommand): Promise<string> {
    const id = (await this.accountRepository.count()) + 1;
    const model = this.accountFactory.createAccountModel(command);

    const account = await this.accountDomain.create(id, model);

    return await this.accountRepository.create(account);
  }
}
