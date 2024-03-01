import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRespository } from 'src/customer/insfrastructure/customer.repository';
import { DeleteCustomerCommand } from '../command/delete.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand, string[]>
{
  @Inject()
  private readonly customerRespository: CustomerRespository;

  async execute(command: DeleteCustomerCommand): Promise<string[]> {
    const models = await this.customerRespository.getByUUIDs(command.uuid);
    return await this.customerRespository.delete(models);
  }
}
