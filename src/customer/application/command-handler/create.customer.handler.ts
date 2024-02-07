import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRespository } from 'src/customer/insfrastructure/customer.repository';
import { CreateCustomerCommand } from '../command/create.customer.command';
@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand, any>
{
  @Inject()
  private readonly customerRespository: CustomerRespository;

  async execute(command: CreateCustomerCommand): Promise<any> {
    return await this.customerRespository.createCustomer(command);
  }
}
