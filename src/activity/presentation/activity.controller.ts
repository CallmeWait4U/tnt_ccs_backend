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
import { CreateActivityCommand } from '../application/activity/command/create.activity.command';
import { DeleteActivityCommand } from '../application/activity/command/delete.activity.command';
import { UpdateActivityCommand } from '../application/activity/command/update.activity.command';
import { GetActivitiesQuery } from '../application/activity/query/get.activities.query';
import { ReadActivityQuery } from '../application/activity/query/read.activity.query';
import { CreateTaskCommand } from '../application/task/command/create.task.command';
import { GetTasksByCustomerQuery } from '../application/task/query/get.tasks.by.customer.query';
import { GetTasksQuery } from '../application/task/query/get.tasks.query';
import { ReadTaskQuery } from '../application/task/query/read.task.query';
import { CreateActivityDTO } from './dto/activity/create.activity.dto';
import { DeleteActivityDTO } from './dto/activity/delete.activity.dto';
import { GetActivitiesDTO } from './dto/activity/get.activities.dto';
import { ReadActivityDTO } from './dto/activity/read.activity.dto';
import { UpdateActivityDTO } from './dto/activity/update.activity.dto';
import { CreateTaskDTO } from './dto/task/create.task.dto';
import { DeleteTaskDTO } from './dto/task/delete.task.dto';
import { GetTasksByCustomer } from './dto/task/get.tasks.by.customer.dto';
import { GetTasksDTO } from './dto/task/get.tasks.dto';
import { ReadTaskDTO } from './dto/task/read.task.dto';

@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/all')
  async getActivities(@Query() q: GetActivitiesDTO) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetActivitiesQuery(offset, limit, q.searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readActivity(@Query() q: ReadActivityDTO) {
    const query = new ReadActivityQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  async createActivity(@Body() body: CreateActivityDTO) {
    const command = new CreateActivityCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/update')
  async updateActivity(@Body() body: UpdateActivityDTO) {
    const command = new UpdateActivityCommand(body);
    return await this.commandBus.execute(command);
  }

  @Delete('/delete')
  async deleteActivity(@Body() body: DeleteActivityDTO) {
    const command = new DeleteActivityCommand(body);
    return await this.commandBus.execute(command);
  }

  @Get('/tasks/all')
  async getTasks(@Query() q: GetTasksDTO) {
    const query = new GetTasksQuery(
      q.activityUUID,
      q.offset,
      q.limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/tasks/detail')
  async readTask(@Query() q: ReadTaskDTO) {
    const query = new ReadTaskQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Get('/tasks/allbycustomer')
  async getTasksByCustomer(@Query() q: GetTasksByCustomer) {
    const query = new GetTasksByCustomerQuery(q.customerUUID, q.history);
    return await this.queryBus.execute(query);
  }

  @Post('/tasks/create')
  async createTask(@Body() body: CreateTaskDTO) {
    const command = new CreateTaskCommand(body);
    return await this.commandBus.execute(command);
  }

  // API Update doneDate

  @Delete('/tasks/delete')
  async deleteTask(@Body() body: DeleteTaskDTO) {
    const command = new DeleteActivityCommand(body);
    return await this.commandBus.execute(command);
  }
}
