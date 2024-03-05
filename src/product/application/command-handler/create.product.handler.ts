import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FirebaseService } from 'libs/firebase.module';
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

  @Inject()
  private readonly firebase: FirebaseService;

  async execute(command: CreateProductCommand): Promise<string> {
    const model = this.productFactory.createProductModel(command);
    try {
      if (command.images) {
        const images = await Promise.all(
          command.images.map(async (image) => {
            const url = await this.firebase.uploadImage(image);
            return this.productFactory.createImageProductModel(url);
          }),
        );
        model.images = images;
      }
    } catch (error) {
      throw new Error('Error uploading images');
    }

    const product = await this.productDomain.create(model);
    return await this.productRepository.create(product);
  }
}
