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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { CreateProductCommand } from '../application/command/create.product.command';
import { DeleteProductCommand } from '../application/command/delete.product.command';
import { UpdateProductCommand } from '../application/command/update.product.command';
import { GetSelectorProductQuery } from '../application/query/get.selector.product.query';
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
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProductController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listProduct(@Query() q: ListProductDTO, @GetUser() user: User) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new ListProductQuery(
      user.tenantId,
      offset,
      limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readProduct(@Query() q: ReadProductDTO, @GetUser() user: User) {
    const query = new ReadProductQuery(q.uuid, user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Get('/getSelectorProduct')
  async getSelectorProduct(@GetUser() user: User) {
    const query = new GetSelectorProductQuery(user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Body() body: CreateProductDTO,
    @UploadedFiles() images: Express.Multer.File[],
    @GetUser() user: User,
  ) {
    body.price = Number(body.price);
    body.quantity = Number(body.quantity);
    const command = new CreateProductCommand({
      ...body,
      images,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async updateProduct(
    @Param('uuid') uuid: string,
    @Body() body: UpdateProductDTO,
    @UploadedFiles() images: Express.Multer.File[],
    @GetUser() user: User,
  ) {
    body.price = Number(body.price);
    body.quantity = Number(body.quantity);
    const command = new UpdateProductCommand({
      ...body,
      uuid,
      images,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Delete('/:uuid')
  async DeleteCustomerCommand(
    @Param() q: DeleteProductDTO,
    @GetUser() user: User,
  ) {
    const command = new DeleteProductCommand(q.uuid, user.tenantId);
    return await this.commandBus.execute(command);
  }

  @Get('/list-product-options/all')
  async listProductOption(
    @GetUser() user: User,
  ): Promise<ListProductOptionsResult> {
    const query = new ListProductOptionsQuery(user.tenantId);
    return await this.queryBus.execute(query);
  }
}
