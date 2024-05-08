import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { CreateAccountCommand } from '../application/command/create.account.command';
import { CreateAccountForCustomerCommand } from '../application/command/create.account.for.customer.command';
import { DeleteAccountCommand } from '../application/command/delete.account.command';
import { UpdateAccountCommand } from '../application/command/update.account.command';
import { GetAccountsQuery } from '../application/query/get.accounts.query';
import { ReadAccountQuery } from '../application/query/read.account.query';
import { CreateAccountDTO } from './dto/create.account.dto';
import { CreateAccountForCustomerDTO } from './dto/create.account.for.customer.dto';
import { DeleteAccountDTO } from './dto/delete.account.dto';
import { GetAccountsDTO } from './dto/get.accounts.dto';
import { ReadAccountDTO } from './dto/read.account.dto';
import { UpdateAccountDTO } from './dto/update.account.dto';

@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class AccountController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/all')
  async getAccounts(@Query() q: GetAccountsDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetAccountsQuery(
      user.tenantId,
      offset,
      limit,
      q.type,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readAccount(@Query() q: ReadAccountDTO, @GetUser() user: User) {
    const query = new ReadAccountQuery(q.uuid, user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  async createAccount(@Body() body: CreateAccountDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new CreateAccountCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Post('/createForCustomer')
  async createAccountForCustomer(
    @Body() body: CreateAccountForCustomerDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new CreateAccountForCustomerCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Put('/update')
  async updateAccount(@Body() body: UpdateAccountDTO, @GetUser() user: User) {
    const command = new UpdateAccountCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Delete('/delete')
  async DeleteCustomerCommand(
    @Body() body: DeleteAccountDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new DeleteAccountCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }
}
