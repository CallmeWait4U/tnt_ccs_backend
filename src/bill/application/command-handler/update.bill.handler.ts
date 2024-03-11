import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BillDomain } from 'src/bill/domain/bill.domain';
import { BillRepository } from 'src/bill/infrastructure/bill.repository';
import { UpdateBillCommand } from '../command/update.bill.command';

@CommandHandler(UpdateBillCommand)
export class UpdateBillHandler
  implements ICommandHandler<UpdateBillCommand, string>
{
  @Inject()
  private readonly billRepository: BillRepository;
  @Inject()
  private readonly billDomain: BillDomain;

  async execute(command: UpdateBillCommand): Promise<string> {
    const modelCurrent = await this.billRepository.getByUUID(command.uuid);
    const modelUpdated = this.billDomain.update(modelCurrent, command);
    return await this.billRepository.update(modelUpdated);
  }
}
