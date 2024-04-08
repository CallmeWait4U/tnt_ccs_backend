import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountDomain } from 'src/account/domain/account.domain';
import { AccountRepository } from 'src/account/infrastructure/account.repository';
import { DeleteAccountCommand } from '../command/delete.account.command';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand, string[]>
{
  @Inject()
  private readonly accountRepository: AccountRepository;
  @Inject()
  private readonly accountDomain: AccountDomain;

  async execute(command: DeleteAccountCommand): Promise<string[]> {
    const models = await this.accountRepository.getByUUIDs(command.uuid);
    this.accountDomain.checkAccount(models);
    return await this.accountRepository.delete(models);
  }
}
