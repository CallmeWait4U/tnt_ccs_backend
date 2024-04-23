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
import { CreateCustomerCommand } from '../application/command/create.customer.command';
import { DeleteCustomerCommand } from '../application/command/delete.command';
import { UpdateCustomerCommand } from '../application/command/update.customer.command';
import { GetCustomersByEmployeeQuery } from '../application/query/get.customers.by.employee.query';
import { GetCustomersQuery } from '../application/query/get.customers.query';
import { ReadCustomerQuery } from '../application/query/read.customer.query';
import { StatisticCustomerQuery } from '../application/query/statistic.customer.query';
import { CreateBusinessCustomerDTO } from './dto/create.business.customer.dto';
import { CreateIndividualCustomerDTO } from './dto/create.individual.customer.dto';
import { DeleteCustomerDTO } from './dto/delete.customer.dto';
import { GetCustomersByEmployeeDTO } from './dto/get.customers.by.employee.dto';
import { GetCustomersDTO } from './dto/get.customers.dto';
import { ReadCustomerDTO } from './dto/read.customer.dto';
import { UpdateBusinessCustomerDTO } from './dto/update.business.customer.dto';
import { UpdateIndividualCustomerDTO } from './dto/update.individual.customer.dto';

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomerController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/all')
  async getCustomers(@Query() q: GetCustomersDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetCustomersQuery(
      user.tenantId,
      offset,
      limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/divideByEmployee')
  async getCustomersByEmployee(
    @Query() q: GetCustomersByEmployeeDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetCustomersByEmployeeQuery(
      user.tenantId,
      user.uuid,
      offset,
      limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readCustomer(@Query() q: ReadCustomerDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const query = new ReadCustomerQuery(q.uuid, user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Post('/create/business')
  async createBusinessCustomer(
    @Body() body: CreateBusinessCustomerDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new CreateCustomerCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Post('/create/individual')
  async createIndividualCustomer(
    @Body() body: CreateIndividualCustomerDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new CreateCustomerCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Put('/update/business')
  async updateBusinessCustomer(
    @Body() body: UpdateBusinessCustomerDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new UpdateCustomerCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Put('/update/individual')
  async updateIndividualCustomer(
    @Body() body: UpdateIndividualCustomerDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new UpdateCustomerCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Delete('/delete')
  async deleteCustomer(@Body() body: DeleteCustomerDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new DeleteCustomerCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Get('/statistic')
  async getStatistic(@GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const query = new StatisticCustomerQuery(user?.tenantId);
    return await this.queryBus.execute(query);
  }
}
