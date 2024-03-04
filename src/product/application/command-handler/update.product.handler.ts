import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomain } from 'src/account/domain/account.domain';
import { ProductRepository } from 'src/account/infrastructure/account.repository';
import { UpdateProductCommand } from '../command/update.product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand, string>
{
  @Inject()
  private readonly accountRepository: ProductRepository;
  @Inject()
  private readonly accountDomain: ProductDomain;

  async execute(command: UpdateProductCommand): Promise<string> {
    const modelCurrent = await this.accountRepository.getByUUID(command.uuid);
    const modelUpdated = this.accountDomain.update(modelCurrent, command);
    return await this.accountRepository.update(modelUpdated);
  }
}
