import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountDomain } from 'src/account/domain/account.domain';
import { AccountFactory } from 'src/account/infrastructure/account.factory';
import { AccountRepository } from 'src/account/infrastructure/account.repository';
import { CreateAccountForCustomerCommand } from '../command/create.account.for.customer.command';

@CommandHandler(CreateAccountForCustomerCommand)
export class CreateAccountForCustomerHandler
  implements ICommandHandler<CreateAccountForCustomerCommand, string>
{
  @Inject()
  private readonly accountRepository: AccountRepository;
  @Inject()
  private readonly accountFactory: AccountFactory;
  @Inject()
  private readonly accountDomain: AccountDomain;

  async execute(command: CreateAccountForCustomerCommand): Promise<string> {
    const model = this.accountFactory.createAccountModel(command);
    model.customer = await this.accountRepository.getCustomerByUUID(
      command.customerUUID,
      command.tenantId,
    );
    const account = await this.accountDomain.create(model);
    return await this.accountRepository.create(account);
  }
}
