import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
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

@ApiTags('price-quotes')
@Controller('price-quotes')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PriceQuoteController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listPriceQuotes(@Query() q: GetPriceQuotesDTO, @GetUser() user: User) {
    let searchModel = q.searchModel || '{}';

    if (user.type === 'CUSTOMER') {
      searchModel = JSON.stringify({
        ...JSON.parse(searchModel),
        customerUUID: { isCustom: false, value: user.uuid, valueType: 'text' },
      });
    }
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetPriceQuotesQuery(offset, limit, searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readPriceQuote(@Param() q: ReadPriceQuoteDTO, @GetUser() user: User) {
    let query;
    if (user.type === 'CUSTOMER') {
      query = new ReadPriceQuoteQuery(q.uuid, user.uuid);
    } else {
      query = new ReadPriceQuoteQuery(q.uuid);
    }

    return await this.queryBus.execute(query);
  }

  @Post('')
  async createPriceQuote(
    @Body() body: CreatePriceQuoteDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new CreatePriceQuoteCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  async updatePriceQuote(
    @Param('uuid') uuid: string,
    @Body() body: UpdatePriceQuoteDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new UpdatePriceQuoteCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }

  @Delete('/:uuid')
  async deletePriceQuote(
    @Param() body: DeletePriceQuoteDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new DeletePriceQuoteCommand(body);
    return await this.commandBus.execute(command);
  }
}
