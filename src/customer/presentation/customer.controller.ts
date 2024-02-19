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
import { CreateCustomerCommand } from '../application/command/create.customer.command';
import { DeleteCustomerCommand } from '../application/command/delete.command';
import { UpdateCustomerCommand } from '../application/command/update.customer.command';
import {
  ListCustomerQuery,
  ReadCustomerQuery,
} from '../application/query/customer.query';
import { CreateCustomerDTO } from './dto/create.customer.dto';
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listCustomers(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const Offset = !offset || offset < 0 ? 0 : offset;
    const Limit = !limit || limit < 0 ? 10 : limit;
    const query = new ListCustomerQuery(null, Offset, Limit);
    return await this.queryBus.execute(query);
  }
  @Get('/:uuid')
  async readCustomer(@Param('uuid') uuid: string) {
    const query = new ReadCustomerQuery(uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createCustomer(@Body() body: CreateCustomerDTO) {
    const command = new CreateCustomerCommand(body);
    return await this.commandBus.execute(command);
  }
  @Put('/:uuid')
  async updateCustomer(
    @Param('uuid') uuid: string,
    @Body() body: CreateCustomerDTO,
  ) {
    const command = new UpdateCustomerCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }
  @Delete('/:uuid')
  async deleteCustomer(@Param('uuid') uuid: string) {
    const command = new DeleteCustomerCommand({ uuid: uuid });
    return await this.commandBus.execute(command);
  }
}
