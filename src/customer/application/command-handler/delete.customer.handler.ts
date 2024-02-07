import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRespository } from 'src/customer/insfrastructure/customer.repository';
import { DeleteCustomerCommand } from '../command/delete.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand, any>
{
  @Inject()
  private readonly customerRespository: CustomerRespository;

  async execute(command: DeleteCustomerCommand): Promise<void> {
    return await this.customerRespository.deleteCustomer(command);
  }
}
