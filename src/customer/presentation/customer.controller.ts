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
import { CreateCustomerCommand } from '../application/command/create.customer.command';
import { DeleteCustomerCommand } from '../application/command/delete.command';
import { UpdateCustomerCommand } from '../application/command/update.customer.command';
import { GetCustomersQuery } from '../application/query/get.customers.query';
import { ReadCustomerQuery } from '../application/query/read.customer.query';
import { CreateBusinessCustomerDTO } from './dto/create.business.customer.dto';
import { CreateIndividualCustomerDTO } from './dto/create.individual.customer.dto';
import { DeleteCustomerDTO } from './dto/delete.customer.dto';
import { GetCustomersDTO } from './dto/get.customers.dto';
import { ReadCustomerDTO } from './dto/read.customer.dto';
import { UpdateBusinessCustomerDTO } from './dto/update.business.customer.dto';
import { UpdateIndividualCustomerDTO } from './dto/update.individual.customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/all')
  async getCustomers(@Query() q: GetCustomersDTO) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetCustomersQuery(offset, limit, q.searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readCustomer(@Query() q: ReadCustomerDTO) {
    const query = new ReadCustomerQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('/create/business')
  async createBusinessCustomer(@Body() body: CreateBusinessCustomerDTO) {
    const command = new CreateCustomerCommand(body);
    return await this.commandBus.execute(command);
  }

  @Post('/create/individual')
  async createIndividualCustomer(@Body() body: CreateIndividualCustomerDTO) {
    const command = new CreateCustomerCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/update/business')
  async updateBusinessCustomer(@Body() body: UpdateBusinessCustomerDTO) {
    const command = new UpdateCustomerCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/update/individual')
  async updateIndividualCustomer(@Body() body: UpdateIndividualCustomerDTO) {
    const command = new UpdateCustomerCommand(body);
    return await this.commandBus.execute(command);
  }

  @Delete('/delete')
  async deleteCustomer(@Body() body: DeleteCustomerDTO) {
    const command = new DeleteCustomerCommand(body);
    return await this.commandBus.execute(command);
  }
}
