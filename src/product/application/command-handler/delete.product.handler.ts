import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductRepository } from 'src/product/infrastructure/product.repository';
import { DeleteProductCommand } from '../command/delete.product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand, string[]>
{
  @Inject()
  private readonly accountRepository: ProductRepository;

  async execute(command: DeleteProductCommand): Promise<string[]> {
    const models = await this.accountRepository.getByUUIDs(command.uuid);
    return await this.accountRepository.delete(models);
  }
}
