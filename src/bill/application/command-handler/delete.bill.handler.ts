import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BillRepository } from 'src/bill/infrastructure/bill.repository';
import { DeleteBillCommand } from '../command/delete.bill.command';

@CommandHandler(DeleteBillCommand)
export class DeleteBillHandler
  implements ICommandHandler<DeleteBillCommand, string[]>
{
  @Inject()
  private readonly billRepository: BillRepository;

  async execute(command: DeleteBillCommand): Promise<string[]> {
    const models = await this.billRepository.getByUUIDs(command.uuid);
    return await this.billRepository.delete(models);
  }
}
