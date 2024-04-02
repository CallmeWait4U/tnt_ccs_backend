import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  ActivityQuery,
  TaskQuery,
} from 'src/activity/insfrastructure/activity.query';
import { ListActivityQuery, ListTaskQuery } from '../query/activity.query';
import { ListActivityResult } from '../query/result/activity.query.result';

@QueryHandler(ListActivityQuery)
export class ListActivitysHandler
  implements IQueryHandler<ListActivityQuery, ListActivityResult>
{
  constructor(private readonly listActivityQuery: ActivityQuery) {}

  async execute(query: ListActivityQuery): Promise<ListActivityResult> {
    return await this.listActivityQuery.listActivity(query.offset, query.limit);
  }
}

@QueryHandler(ListTaskQuery)
export class ListTasksHandler implements IQueryHandler<ListTaskQuery, any> {
  constructor(private readonly taskQuery: TaskQuery) {}

  async execute(query: ListTaskQuery): Promise<any> {
    return await this.taskQuery.listTask(
      query.activityUUID,
      query.offset,
      query.limit,
    );
  }
}
