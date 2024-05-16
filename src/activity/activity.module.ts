import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateActivityHandler } from './application/activity/command-handler/create.activity.handler';
import { DeleteEpmloyeeHandler } from './application/activity/command-handler/delete.activity.handler';
import { UpdateActivityHandler } from './application/activity/command-handler/update.activity.handler';
import { GetActivitiesHandler } from './application/activity/query-handler/get.activities.handler';
import { ReadActivityHandler } from './application/activity/query-handler/read.activity.handler';
import { CreateAutoTaskHandler } from './application/task/command-handler/create.auto.task.handler';
import { CreateTaskHandler } from './application/task/command-handler/create.task.handler';
import { DeleteTaskHandler } from './application/task/command-handler/delete.task.handler';
import { SendEmailTaskHandler } from './application/task/command-handler/send.email.task.handler';
import { UpdateStatusTaskHandler } from './application/task/command-handler/update.status.task.handler';
import { GetTasksByCustomerHandler } from './application/task/query-handler/get.tasks.by.customer.handler';
import { GetTasksHandler } from './application/task/query-handler/get.tasks.handler';
import { ReadTaskHandler } from './application/task/query-handler/read.task.handler';
import { ActivityDomain } from './domain/activity/activity.domain';
import { TaskDomain } from './domain/task/task.domain';
import { ActivityFactory } from './insfrastructure/activity/activity.factory';
import { ActivityQuery } from './insfrastructure/activity/activity.query';
import { ActivityRespository } from './insfrastructure/activity/activity.repository';
import { TaskFactory } from './insfrastructure/task/task.factory';
import { TaskQuery } from './insfrastructure/task/task.query';
import { TaskRepository } from './insfrastructure/task/task.repository';
import { ActivityController } from './presentation/activity.controller';

const application = [
  GetActivitiesHandler,
  CreateActivityHandler,
  UpdateActivityHandler,
  DeleteEpmloyeeHandler,
  ReadActivityHandler,
  GetTasksHandler,
  ReadTaskHandler,
  CreateTaskHandler,
  DeleteTaskHandler,
  GetTasksByCustomerHandler,
  CreateAutoTaskHandler,
  UpdateStatusTaskHandler,
  SendEmailTaskHandler,
];

const infrastructure = [
  ActivityFactory,
  ActivityRespository,
  ActivityQuery,
  TaskFactory,
  TaskRepository,
  TaskQuery,
];

const domain = [ActivityDomain, TaskDomain];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [ActivityController],
})
export class ActivityModule {}
