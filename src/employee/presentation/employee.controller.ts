import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeCommand } from '../application/command/create.employee.command';
import { DeleteEmployeeCommand } from '../application/command/delete.employee.command';
import { UpdateEmployeeCommand } from '../application/command/update.employee.command';
import {
  ListEmployeeQuery,
  ReadEmployeeQuery,
} from '../application/query/employee.query';
import { CreateEmployeeDTO } from './dto/create.employee.dto';
import { UpdateEmployeeDTO } from './dto/update.employee.dto';
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  async createEmployee(
    @Body() body: CreateEmployeeDTO,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    body.gender = parseInt(body.gender.toString());
    body.city = parseInt(body.city.toString());
    const command = new CreateEmployeeCommand({ ...body, avatar });
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateEmployee(
    @Param('uuid') uuid: string,
    @Body() body: UpdateEmployeeDTO,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    body.gender = parseInt(body.gender.toString());
    body.city = parseInt(body.city.toString());
    const command = new UpdateEmployeeCommand({ ...body, avatar, uuid });
    return await this.commandBus.execute(command);
  }
  @Delete('/:uuid')
  async deleteEmployee(@Param('uuid') uuid: string) {
    const command = new DeleteEmployeeCommand({ uuid: uuid });
    return await this.commandBus.execute(command);
  }
}
