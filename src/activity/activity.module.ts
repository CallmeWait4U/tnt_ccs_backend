import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateActivityHandler } from './application/command-handler/create.activity.handler';
import { DeleteEpmloyeeHandler } from './application/command-handler/delete.activity.handler';
import { UpdateActivityHandler } from './application/command-handler/update.activity.handler';
import { ListActivitysHandler } from './application/query-handler/list.activity.handler';
import { ReadActivityHandler } from './application/query-handler/read.activity.handler';
import { ActivityQuery } from './insfrastructure/activity.query';
import { ActivityRespository } from './insfrastructure/activity.repository';
import { ActivityController } from './presentation/activity.controller';

const application = [
  ListActivitysHandler,
  CreateActivityHandler,
  UpdateActivityHandler,
  DeleteEpmloyeeHandler,
  ReadActivityHandler,
];

const infrastructure = [ActivityRespository, ActivityQuery];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [ActivityController],
})
export class ActivityModule {}
