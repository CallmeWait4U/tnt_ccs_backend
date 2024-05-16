import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from 'src/account/infrastructure/account.repository';
import { RejectAccountForCustomerCommand } from '../command/reject.account.for.customer.command';

@CommandHandler(RejectAccountForCustomerCommand)
export class RejectAccountForCustomerHandler
  implements ICommandHandler<RejectAccountForCustomerCommand, string>
{
  @Inject()
  private readonly accountRepository: AccountRepository;

  async execute(command: RejectAccountForCustomerCommand): Promise<string> {
    return await this.accountRepository.rejectAccountForCustomer(
      command.customerUUID,
      command.tenantId,
    );
  }
}
