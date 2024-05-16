import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerDomain } from 'src/customer/domain/customer.domain';
import { CustomerFactory } from 'src/customer/insfrastructure/customer.factory';
import { CustomerRespository } from 'src/customer/insfrastructure/customer.repository';
import { CreateCustomerCommand } from '../command/create.customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand, string>
{
  @Inject()
  private readonly customerRespository: CustomerRespository;
  @Inject()
  private readonly customerFactory: CustomerFactory;
  @Inject()
  private readonly customerDomain: CustomerDomain;

  async execute(command: CreateCustomerCommand): Promise<string> {
    const model = this.customerFactory.createCustomerModel(command);
    const customer = this.customerDomain.create(model);
    return await this.customerRespository.create(customer);
  }
}
