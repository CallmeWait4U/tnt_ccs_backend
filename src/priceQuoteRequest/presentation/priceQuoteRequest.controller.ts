import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatusPriceQuoteRequest } from '@prisma/client';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { CreatePriceQuoteRequestCommand } from '../application/command/create.priceQuoteRequest.command';
import { DeletePriceQuoteRequestCommand } from '../application/command/delete.priceQuoteRequest.command';
import { SendPriceQuoteRequestCommand } from '../application/command/send.priceQuoteRequest.command';
import { UpdatePriceQuoteRequestCommand } from '../application/command/update.priceQuoteRequest.command';
import { GetPriceQuoteRequestByCustomerQuery } from '../application/query/get.priceQuoteRequest.by.customer.query';
import { GetPriceQuoteRequestsQuery } from '../application/query/list.priceQuoteRequest.query';
import { ReadPriceQuoteRequestQuery } from '../application/query/read.priceQuoteRequest.query';
import { CreatePriceQuoteRequestDTO } from './dto/create.priceQuoteRequest.dto';
import { DeletePriceQuoteRequestDTO } from './dto/delete.priceQuoteRequest.dto';
import { GetPriceQuoteRequestByCustomerDTO } from './dto/get.priceQuoteRequest.by.customer.dto';
import { GetPriceQuoteRequestsDTO } from './dto/list.priceQuoteRequest.dto';
import { ReadPriceQuoteRequestDTO } from './dto/read.priceQuoteRequest.dto';
import { SendPriceQuoteRequestDTO } from './dto/send.priceQuoteRequest.dto';
import { UpdatePriceQuoteRequestDTO } from './dto/update.priceQuoteRequest.dto';

@ApiTags('price-quote-requests')
@Controller('price-quote-requests')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class PriceQuoteRequestController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listPriceQuoteRequests(
    @Query() q: GetPriceQuoteRequestsDTO,
    @GetUser() user: User,
  ) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetPriceQuoteRequestsQuery(
      user.tenantId,
      offset,
      limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readPriceQuoteRequest(
    @Param() q: ReadPriceQuoteRequestDTO,
    @GetUser() user: User,
  ) {
    const query = new ReadPriceQuoteRequestQuery(user.tenantId, q.uuid);
    return await this.queryBus.execute(query);
  }

  @Get('/getByCustomer')
  async getPriceQuoteByCustomer(
    @Query() q: GetPriceQuoteRequestByCustomerDTO,
    @GetUser() user: User,
  ) {
    const query = new GetPriceQuoteRequestByCustomerQuery(
      q.customerUUID,
      user.tenantId,
    );
    return await this.queryBus.execute(query);
  }

  @Post('/send')
  async sendPriceQuoteRequest(
    @Query() q: SendPriceQuoteRequestDTO,
    @GetUser() user: User,
  ) {
    const query = new SendPriceQuoteRequestCommand(q.uuid, user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createPriceQuoteRequest(
    @Body() body: CreatePriceQuoteRequestDTO,
    @GetUser() user: User,
  ) {
    const command = new CreatePriceQuoteRequestCommand({
      ...body,
      accountCustomerUUID: user.uuid,
      tenantId: user.tenantId,
    });
    const uuid = await this.commandBus.execute(command);
    if (body.status === StatusPriceQuoteRequest.SENT) {
      const query = new SendPriceQuoteRequestCommand(uuid, user.tenantId);
      await this.queryBus.execute(query);
    }
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
