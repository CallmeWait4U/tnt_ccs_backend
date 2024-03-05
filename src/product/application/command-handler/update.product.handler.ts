import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomain } from 'src/product/domain/product.domain';
import { ProductRepository } from 'src/product/infrastructure/product.repository';
import { UpdateProductCommand } from '../command/update.product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand, string>
{
  @Inject()
  private readonly productRepository: ProductRepository;
  @Inject()
  private readonly productDomain: ProductDomain;

  async execute(command: UpdateProductCommand): Promise<string> {
    const modelCurrent = await this.productRepository.getByUUID(command.uuid);
    const modelUpdated = this.productDomain.update(modelCurrent, command);
    return await this.productRepository.update(modelUpdated);
  }
}
