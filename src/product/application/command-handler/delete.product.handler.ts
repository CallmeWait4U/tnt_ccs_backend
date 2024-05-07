import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductDomain } from 'src/product/domain/product.domain';
import { ProductRepository } from 'src/product/infrastructure/product.repository';
import { DeleteProductCommand } from '../command/delete.product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand, string[]>
{
  @Inject()
  private readonly accountRepository: ProductRepository;
  @Inject()
  private readonly productDomain: ProductDomain;

  async execute(command: DeleteProductCommand): Promise<string[]> {
    const models = await this.accountRepository.getByUUIDs(
      command.uuid,
      command.tenantId,
    );
    this.productDomain.checkProduct(models);
    return await this.accountRepository.delete(models);
  }
}
