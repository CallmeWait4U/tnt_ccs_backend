import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerDomain } from 'src/customer/domain/customer.domain';
import { CustomerRespository } from 'src/customer/insfrastructure/customer.repository';
import { DeleteCustomerCommand } from '../command/delete.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand, string[]>
{
  @Inject()
  private readonly customerRespository: CustomerRespository;
  @Inject()
  private readonly customerDomain: CustomerDomain;

  async execute(command: DeleteCustomerCommand): Promise<string[]> {
    const models = await this.customerRespository.getByUUIDs(
      command.uuids,
      command.tenantId,
    );
    this.customerDomain.checkCustomer(models);
    return await this.customerRespository.delete(models);
  }
}
