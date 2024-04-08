import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountDomain } from 'src/account/domain/account.domain';
import { AccountRepository } from 'src/account/infrastructure/account.repository';
import { UpdateAccountCommand } from '../command/update.account.command';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand, string>
{
  @Inject()
  private readonly accountRepository: AccountRepository;
  @Inject()
  private readonly accountDomain: AccountDomain;

  async execute(command: UpdateAccountCommand): Promise<string> {
    const modelCurrent = await this.accountRepository.getByUUID(
      command.uuid,
      command.tenantId,
    );
    this.accountDomain.checkAccount(modelCurrent);
    const modelUpdated = this.accountDomain.update(modelCurrent, command);
    return await this.accountRepository.update(modelUpdated);
  }
}
