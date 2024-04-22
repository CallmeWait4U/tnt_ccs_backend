import {
  Body,
  Controller,
  Delete,
  Get,
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
import { CreateActivityCommand } from '../application/activity/command/create.activity.command';
import { DeleteActivityCommand } from '../application/activity/command/delete.activity.command';
import { UpdateActivityCommand } from '../application/activity/command/update.activity.command';
import { GetActivitiesQuery } from '../application/activity/query/get.activities.query';
import { ReadActivityQuery } from '../application/activity/query/read.activity.query';
import { CreateTaskCommand } from '../application/task/command/create.task.command';
import { DeleteTaskCommand } from '../application/task/command/delete.task.command';
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
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ActivityController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/all')
  async getActivities(@Query() q: GetActivitiesDTO, @GetUser() user: User) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetActivitiesQuery(
      user.tenantId,
      offset,
      limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readActivity(@Query() q: ReadActivityDTO, @GetUser() user: User) {
    const query = new ReadActivityQuery(user.tenantId, q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  async createActivity(@Body() body: CreateActivityDTO, @GetUser() user: User) {
    const command = new CreateActivityCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Put('/update')
  async updateActivity(@Body() body: UpdateActivityDTO, @GetUser() user: User) {
    const command = new UpdateActivityCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Delete('/delete')
  async deleteActivity(@Body() body: DeleteActivityDTO, @GetUser() user: User) {
    const command = new DeleteActivityCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Get('/tasks/all')
  async getTasks(@Query() q: GetTasksDTO, @GetUser() user: User) {
    const query = new GetTasksQuery(
      user.tenantId,
      q.activityUUID,
      q.offset,
      q.limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/tasks/detail')
  async readTask(@Query() q: ReadTaskDTO, @GetUser() user: User) {
    const query = new ReadTaskQuery(user.tenantId, q.uuid);
    return await this.queryBus.execute(query);
  }

  @Get('/tasks/allbycustomer')
  async getTasksByCustomer(
    @Query() q: GetTasksByCustomer,
    @GetUser() user: User,
  ) {
    const query = new GetTasksByCustomerQuery(
      user.tenantId,
      q.customerUUID,
      q.history,
    );
    return await this.queryBus.execute(query);
  }

  @Post('/tasks/create')
  async createTask(@Body() body: CreateTaskDTO, @GetUser() user: User) {
    const command = new CreateTaskCommand({ ...body, tenantId: user.tenantId });
    return await this.commandBus.execute(command);
  }

  // API Update doneDate

  @Delete('/tasks/delete')
  async deleteTask(@Body() body: DeleteTaskDTO, @GetUser() user: User) {
    const command = new DeleteTaskCommand({ ...body, tenantId: user.tenantId });
    return await this.commandBus.execute(command);
  }
}
