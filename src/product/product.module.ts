import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductHandler } from './application/command-handler/create.product.handler';
import { DeleteProductHandler } from './application/command-handler/delete.product.handler';
import { UpdateProductHandler } from './application/command-handler/update.product.handler';
import { GetProductsHandler } from './application/query-handler/list.product.handler';
import { ListProductOptionsHandler } from './application/query-handler/list.product.options.handler';
import { ReadProductHandler } from './application/query-handler/read.product.handler';
import { ProductDomain } from './domain/product.domain';
import { ProductFactory } from './infrastructure/product.factory';
import { ProductQuery } from './infrastructure/product.query';
import { ProductRepository } from './infrastructure/product.repository';
import { ProductController } from './presentation/product.controller';

const application = [
  GetProductsHandler,
  ReadProductHandler,
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  ListProductOptionsHandler,
];

const infrastructure = [ProductRepository, ProductQuery, ProductFactory];

const domain = [ProductDomain];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [ProductController],
})
export class ProductModule {}
