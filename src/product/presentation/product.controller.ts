import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductCommand } from '../application/command/create.product.command';
import { DeleteProductCommand } from '../application/command/delete.product.command';
import { UpdateProductCommand } from '../application/command/update.product.command';
import { GetProductsQuery } from '../application/query/get.product.query';
import { ReadProductQuery } from '../application/query/read.product.query';
import { CreateProductDTO } from './dto/create.product.dto';
import { DeleteProductDTO } from './dto/delete.product.dto';
import { GetProductsDTO } from './dto/list.product.dto';
import { ReadProductDTO } from './dto/read.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';

@ApiTags('accounts')
@Controller('accounts')
export class ProductController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/all')
  async getProducts(@Query() q: GetProductsDTO) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetProductsQuery(offset, limit, q.type, q.searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readProduct(@Query() q: ReadProductDTO) {
    const query = new ReadProductQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  async createProduct(@Body() body: CreateProductDTO) {
    const command = new CreateProductCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/update')
  async updateProduct(@Body() body: UpdateProductDTO) {
    const command = new UpdateProductCommand(body);
    return await this.commandBus.execute(command);
  }

  @Delete('/delete')
  async DeleteCustomerCommand(@Body() body: DeleteProductDTO) {
    const command = new DeleteProductCommand(body);
    return await this.commandBus.execute(command);
  }
}
