import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { ProductModel } from '../domain/product.model';
import { ProductFactory } from './product.factory';

export class ProductRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly productFactory: ProductFactory;

  async create(product: ProductModel): Promise<any> {
    const { images, ...data } = product;

    await this.prisma.product.create({ data });
    if (images) {
      await Promise.all(
        images.map(async (image) => {
          await this.prisma.imageProduct.create({
            data: {
              ...image,
              product: { connect: { uuid: product.uuid } }, // Liên kết với sản phẩm đã tạo
            },
          });
        }),
      );
    }
    return { uuid: product.uuid };
  }

  async update(
    product: ProductModel,
    isChangeImage: boolean,
    listImageProduct: any,
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, images, ...data } = product;

    await this.prisma.product.update({
      data,
      where: { uuid },
    });
    await this.prisma.imageProduct.deleteMany({ where: { product: { uuid } } });
    if (isChangeImage && listImageProduct) {
      await Promise.all(
        listImageProduct.map(async (image) => {
          await this.prisma.imageProduct.create({
            data: {
              ...image,
              product: { connect: { uuid: uuid } }, // Liên kết với sản phẩm đã tạo
            },
          });
        }),
      );
    }
    return { uuid: product.uuid };
  }

  async delete(models: ProductModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.imageProduct.deleteMany({
      where: { product: { uuid: { in: uuids } } },
    });
    await this.prisma.product.deleteMany({ where: { uuid: { in: uuids } } });

    return uuids;
  }

  async getByUUID(uuid: string): Promise<ProductModel> {
    const entity = await this.prisma.product.findUnique({
      where: { uuid },
    });
    return this.productFactory.createProductModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<ProductModel[]> {
    const entities = await this.prisma.product.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
    });
    return this.productFactory.createProductModels(entities);
  }

  async count(): Promise<number> {
    return await this.prisma.product.count();
  }
}
