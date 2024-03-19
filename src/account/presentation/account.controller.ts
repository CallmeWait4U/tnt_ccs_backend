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
import { CreateAccountCommand } from '../application/command/create.account.command';
import { DeleteAccountCommand } from '../application/command/delete.account.command';
import { UpdateAccountCommand } from '../application/command/update.account.command';
import { GetAccountsQuery } from '../application/query/get.accounts.query';
import { ReadAccountQuery } from '../application/query/read.account.query';
import { CreateAccountDTO } from './dto/create.account.dto';
import { DeleteAccountDTO } from './dto/delete.account.dto';
import { GetAccountsDTO } from './dto/get.accounts.dto';
import { ReadAccountDTO } from './dto/read.account.dto';
import { UpdateAccountDTO } from './dto/update.account.dto';

@ApiTags('accounts')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class AccountController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/all')
  async getAccounts(@Query() q: GetAccountsDTO) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetAccountsQuery(offset, limit, q.type, q.searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readAccount(@Query() q: ReadAccountDTO) {
    const query = new ReadAccountQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  async createAccount(@Body() body: CreateAccountDTO) {
    const command = new CreateAccountCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/update')
  async updateAccount(@Body() body: UpdateAccountDTO) {
    const command = new UpdateAccountCommand(body);
    return await this.commandBus.execute(command);
  }

  @Delete('/delete')
  async DeleteCustomerCommand(@Body() body: DeleteAccountDTO) {
    const command = new DeleteAccountCommand(body);
    return await this.commandBus.execute(command);
  }
}
