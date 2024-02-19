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
import { CreateEmployeeCommand } from '../application/command/create.employee.command';
import { DeleteEmployeeCommand } from '../application/command/delete.employee.command';
import { UpdateEmployeeCommand } from '../application/command/update.employee.command';
import {
  ListEmployeeQuery,
  ReadEmployeeQuery,
} from '../application/query/employee.query';
import { CreateEmployeeDTO } from './dto/create.employee.dto';
@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listEmployees(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const Offset = !offset || offset < 0 ? 0 : offset;
    const Limit = !limit || limit < 0 ? 10 : limit;
    const query = new ListEmployeeQuery(null, Offset, Limit);
    return await this.queryBus.execute(query);
  }
  @Get('/:uuid')
  async readEmployee(@Param('uuid') uuid: string) {
    const query = new ReadEmployeeQuery(uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createEmployee(@Body() body: CreateEmployeeDTO) {
    const command = new CreateEmployeeCommand(body);
    return await this.commandBus.execute(command);
  }
  @Put('/:uuid')
  async updateEmployee(
    @Param('uuid') uuid: string,
    @Body() body: CreateEmployeeDTO,
  ) {
    const command = new UpdateEmployeeCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }
  @Delete('/:uuid')
  async deleteEmployee(@Param('uuid') uuid: string) {
    const command = new DeleteEmployeeCommand({ uuid: uuid });
    return await this.commandBus.execute(command);
  }
}
