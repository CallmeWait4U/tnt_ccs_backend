import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreatePriceQuoteRequestCommand } from '../application/command/create.priceQuoteRequest.command';
import { DeletePriceQuoteRequestCommand } from '../application/command/delete.priceQuoteRequest.command';
import { UpdatePriceQuoteRequestCommand } from '../application/command/update.priceQuoteRequest.command';
import { GetPriceQuoteRequestsQuery } from '../application/query/list.priceQuoteRequest.query';
import { ReadPriceQuoteRequestQuery } from '../application/query/read.priceQuoteRequest.query';
import { CreatePriceQuoteRequestDTO } from './dto/create.priceQuoteRequest.dto';
import { DeletePriceQuoteRequestDTO } from './dto/delete.priceQuoteRequest.dto';
import { GetPriceQuoteRequestsDTO } from './dto/list.priceQuoteRequest.dto';
import { ReadPriceQuoteRequestDTO } from './dto/read.priceQuoteRequest.dto';
import { UpdatePriceQuoteRequestDTO } from './dto/update.priceQuoteRequest.dto';

@ApiTags('price-quote-requests')
@Controller('price-quote-requests')
export class PriceQuoteRequestController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listPriceQuoteRequests(@Query() q: GetPriceQuoteRequestsDTO) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetPriceQuoteRequestsQuery(offset, limit, q.searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readPriceQuoteRequest(@Param() q: ReadPriceQuoteRequestDTO) {
    const query = new ReadPriceQuoteRequestQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createPriceQuoteRequest(@Body() body: CreatePriceQuoteRequestDTO) {
    const command = new CreatePriceQuoteRequestCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  async updatePriceQuoteRequest(
    @Param('uuid') uuid: string,
    @Body() body: UpdatePriceQuoteRequestDTO,
  ) {
    const command = new UpdatePriceQuoteRequestCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }

  @Delete('/:uuid')
  async deletePriceQuoteRequest(@Param() body: DeletePriceQuoteRequestDTO) {
    const command = new DeletePriceQuoteRequestCommand(body);
    return await this.commandBus.execute(command);
  }
}
