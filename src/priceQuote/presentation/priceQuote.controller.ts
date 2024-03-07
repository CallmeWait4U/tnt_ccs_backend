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
import { CreatePriceQuoteCommand } from '../application/command/create.priceQuote.command';
import { DeletePriceQuoteCommand } from '../application/command/delete.priceQuote.command';
import { UpdatePriceQuoteCommand } from '../application/command/update.priceQuote.command';
import { GetPriceQuotesQuery } from '../application/query/list.priceQuote.query';
import { ReadPriceQuoteQuery } from '../application/query/read.priceQuote.query';
import { CreatePriceQuoteDTO } from './dto/create.priceQuote.dto';
import { DeletePriceQuoteDTO } from './dto/delete.priceQuote.dto';
import { GetPriceQuotesDTO } from './dto/list.priceQuote.dto';
import { ReadPriceQuoteDTO } from './dto/read.priceQuote.dto';
import { UpdatePriceQuoteDTO } from './dto/update.priceQuote.dto';

@ApiTags('priceQuotes')
@Controller('priceQuotes')
export class PriceQuoteController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listPriceQuotes(@Query() q: GetPriceQuotesDTO) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetPriceQuotesQuery(offset, limit, q.searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readPriceQuote(@Param() q: ReadPriceQuoteDTO) {
    const query = new ReadPriceQuoteQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createPriceQuote(@Body() body: CreatePriceQuoteDTO) {
    const command = new CreatePriceQuoteCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  async updatePriceQuote(
    @Param('uuid') uuid: string,
    @Body() body: UpdatePriceQuoteDTO,
  ) {
    const command = new UpdatePriceQuoteCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }

  @Delete('/:uuid')
  async deletePriceQuote(@Param() body: DeletePriceQuoteDTO) {
    const command = new DeletePriceQuoteCommand(body);
    return await this.commandBus.execute(command);
  }
}
