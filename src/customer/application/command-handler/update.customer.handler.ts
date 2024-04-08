import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerDomain } from 'src/customer/domain/customer.domain';
import { CustomerRespository } from 'src/customer/insfrastructure/customer.repository';
import { UpdateCustomerCommand } from '../command/update.customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand, string>
{
  @Inject()
  private readonly customerRespository: CustomerRespository;
  @Inject()
  private readonly customerDomain: CustomerDomain;

  async execute(command: UpdateCustomerCommand): Promise<string> {
    const modelCurrent = await this.customerRespository.getByUUID(
      command.uuid,
      command.tenantId,
    );
    this.customerDomain.checkCustomer(modelCurrent);
    const modelUpdated = this.customerDomain.update(modelCurrent, command);
    return await this.customerRespository.update(modelUpdated);
  }
}
