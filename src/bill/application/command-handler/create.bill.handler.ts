import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BillDomain } from 'src/bill/domain/bill.domain';
import { BillFactory } from 'src/bill/infrastructure/bill.factory';
import { BillRepository } from 'src/bill/infrastructure/bill.repository';
import { CreateBillCommand } from '../command/create.bill.command';

@CommandHandler(CreateBillCommand)
export class CreateBillHandler
  implements ICommandHandler<CreateBillCommand, string>
{
  @Inject()
  private readonly billRepository: BillRepository;
  @Inject()
  private readonly billFactory: BillFactory;
  @Inject()
  private readonly billDomain: BillDomain;

  async execute(command: CreateBillCommand): Promise<string> {
    const model = this.billFactory.createBillModel(command);
    const bill = await this.billDomain.create(model);

    return await this.billRepository.create(bill);
  }
}
