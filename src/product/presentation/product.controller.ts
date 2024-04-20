import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateProductCommand } from '../application/command/create.product.command';
import { DeleteProductCommand } from '../application/command/delete.product.command';
import { UpdateProductCommand } from '../application/command/update.product.command';
import { ListProductOptionsQuery } from '../application/query/list.product.options.query';
import { ListProductQuery } from '../application/query/list.product.query';
import { ReadProductQuery } from '../application/query/read.product.query';
import { ListProductOptionsResult } from '../application/query/result/list.product.options.query.result';
import { CreateProductDTO } from './dto/create.product.dto';
import { DeleteProductDTO } from './dto/delete.product.dto';
import { ListProductDTO } from './dto/list.product.dto';
import { ReadProductDTO } from './dto/read.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listProduct(@Query() q: ListProductDTO) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new ListProductQuery(offset, limit, q.searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readProduct(@Query() q: ReadProductDTO) {
    const query = new ReadProductQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Body() body: CreateProductDTO,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    body.price = Number(body.price);
    body.quantity = Number(body.quantity);
    const command = new CreateProductCommand({ ...body, images });
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async updateProduct(
    @Param('uuid') uuid: string,
    @Body() body: UpdateProductDTO,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    body.price = Number(body.price);
    body.quantity = Number(body.quantity);
    const command = new UpdateProductCommand({ ...body, uuid, images });
    return await this.commandBus.execute(command);
  }

  @Delete('/:uuid')
  async DeleteCustomerCommand(@Param() q: DeleteProductDTO) {
    const command = new DeleteProductCommand(q.uuid);
    return await this.commandBus.execute(command);
  }

  @Get('/list-product-options/all')
  async listProductOption(): Promise<ListProductOptionsResult> {
    const query = new ListProductOptionsQuery();
    return await this.queryBus.execute(query);
  }
}
