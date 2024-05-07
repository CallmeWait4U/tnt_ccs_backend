import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FirebaseService } from 'libs/firebase.module';
import { ProductDomain } from 'src/product/domain/product.domain';
import { ProductFactory } from 'src/product/infrastructure/product.factory';
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
  @Inject()
  private readonly productFactory: ProductFactory;
  @Inject()
  private readonly firebase: FirebaseService;

  async execute(command: UpdateProductCommand): Promise<string> {
    const modelCurrent = await this.productRepository.getByUUID(
      command.uuid,
      command.tenantId,
    );
    this.productDomain.checkProduct(modelCurrent);
    const modelUpdated = this.productDomain.update(modelCurrent, command);
    let listImageProduct;
    if (command.isChangeImage && command.images)
      try {
        if (command.images) {
          const images = await Promise.all(
            command.images.map(async (image) => {
              const url = await this.firebase.uploadImage(image);
              return this.productFactory.createImageProductModel(url);
            }),
          );
          listImageProduct = images;
        }
      } catch (error) {
        throw new Error('Error uploading images');
      }
    return await this.productRepository.update(
      modelUpdated,
      command.isChangeImage,
      listImageProduct,
    );
  }
}
