import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from 'src/account/infrastructure/account.repository';
import { DeleteAccountCommand } from '../command/delete.account.command';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand, string[]>
{
  @Inject()
  private readonly accountRepository: AccountRepository;

  async execute(command: DeleteAccountCommand): Promise<string[]> {
    const models = await this.accountRepository.getByUUIDs(command.uuid);
    return await this.accountRepository.delete(models);
  }
}
