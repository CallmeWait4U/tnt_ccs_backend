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
import {
  CreateActivityCommand,
  CreateTaskCommand,
} from '../application/command/create.activity.command';
import {
  DeleteActivityCommand,
  DeleteTaskCommand,
} from '../application/command/delete.activity.command';
import {
  UpdateActivityCommand,
  UpdateTaskCommand,
} from '../application/command/update.activity.command';

import {
  ListActivityQuery,
  ListTaskQuery,
  ReadActivityQuery,
  ReadTaskQuery,
} from '../application/query/activity.query';
import { CreateActivityDTO, CreateTaskDTO } from './dto/create.activity.dto';
import { FindAllActivityDTO } from './dto/find.all.activity.dto';
import { UpdateTaskDTO } from './dto/update.activity.dto';
@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listActivities(@Query() q: FindAllActivityDTO) {
    const Offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const Limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new ListActivityQuery(null, Offset, Limit);
    return await this.queryBus.execute(query);
  }
  @Get('/:uuid')
  async readActivity(@Param('uuid') uuid: string) {
    const query = new ReadActivityQuery(uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createActivity(@Body() body: CreateActivityDTO) {
    const command = new CreateActivityCommand(body);
    return await this.commandBus.execute(command);
  }
  @Put('/:uuid')
  async updateActivity(
    @Param('uuid') uuid: string,
    @Body() body: CreateActivityDTO,
  ) {
    const command = new UpdateActivityCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }
  @Delete('/:uuid')
  async deleteActivity(@Param('uuid') uuid: string) {
    const command = new DeleteActivityCommand({ uuid: uuid });
    return await this.commandBus.execute(command);
  }
}

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/listByActivity/:activityUUID')
  async listTasks(
    @Query('activityUUID') activityUUID: string,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    const Offset = !offset || offset < 0 ? 0 : offset;
    const Limit = !limit || limit < 0 ? 10 : limit;
    const query = new ListTaskQuery(null, activityUUID, Offset, Limit);
    return await this.queryBus.execute(query);
  }
  @Get('/:uuid')
  async readTask(@Param('uuid') uuid: string) {
    const query = new ReadTaskQuery(uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createTask(@Body() body: CreateTaskDTO) {
    console.log('DTO ', body);
    const command = new CreateTaskCommand(body);
    return await this.commandBus.execute(command);
  }
  @Put('/:uuid')
  async updateTask(@Param('uuid') uuid: string, @Body() body: UpdateTaskDTO) {
    const command = new UpdateTaskCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }
  @Delete('/:uuid')
  async deleteTask(@Param('uuid') uuid: string) {
    const command = new DeleteTaskCommand({ uuid: uuid });
    return await this.commandBus.execute(command);
  }
}
