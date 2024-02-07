import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRespository } from 'src/customer/insfrastructure/customer.repository';
import { UpdateCustomerCommand } from '../command/update.customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand, any>
{
  @Inject()
  private readonly customerRespository: CustomerRespository;

  async execute(command: UpdateCustomerCommand): Promise<void> {
    return await this.customerRespository.updateCustomer(command);
  }
}
