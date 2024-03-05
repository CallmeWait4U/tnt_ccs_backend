import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomain } from 'src/product/domain/product.domain';
import { ProductFactory } from 'src/product/infrastructure/product.factory';
import { ProductRepository } from 'src/product/infrastructure/product.repository';
import { CreateProductCommand } from '../command/create.product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, string>
{
  @Inject()
  private readonly productRepository: ProductRepository;
  @Inject()
  private readonly productFactory: ProductFactory;
  @Inject()
  private readonly productDomain: ProductDomain;

  async execute(command: CreateProductCommand): Promise<string> {
    const model = this.productFactory.createProductModel(command);

    const product = await this.productDomain.create(model);

    return await this.productRepository.create(product);
  }
}
