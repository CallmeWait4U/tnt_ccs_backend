import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateActivityHandler,
  CreateTaskHandler,
} from './application/command-handler/create.activity.handler';
import {
  DeleteEpmloyeeHandler,
  DeleteTaskHandler,
} from './application/command-handler/delete.activity.handler';
import {
  UpdateActivityHandler,
  UpdateTaskHandler,
} from './application/command-handler/update.activity.handler';
import {
  ListActivitysHandler,
  ListTasksHandler,
} from './application/query-handler/list.activity.handler';
import {
  ReadActivityHandler,
  ReadTaskHandler,
} from './application/query-handler/read.activity.handler';
import { ActivityQuery, TaskQuery } from './insfrastructure/activity.query';
import {
  ActivityRespository,
  TaskRespository,
} from './insfrastructure/activity.repository';
import {
  ActivityController,
  TaskController,
} from './presentation/activity.controller';

const application = [
  ListActivitysHandler,
  CreateActivityHandler,
  UpdateActivityHandler,
  DeleteEpmloyeeHandler,
  ReadActivityHandler,

  ListTasksHandler,
  ReadTaskHandler,
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
];

const infrastructure = [
  ActivityRespository,
  ActivityQuery,
  TaskRespository,
  TaskQuery,
];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [ActivityController, TaskController],
})
export class ActivityModule {}
