import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ActivityQuery,
  TaskQuery,
} from 'src/activity/insfrastructure/activity.query';
import { ReadActivityQuery, ReadTaskQuery } from '../query/activity.query';
import { ActivityItem } from '../query/result/activity.query.result';

@QueryHandler(ReadActivityQuery)
export class ReadActivityHandler
  implements IQueryHandler<ReadActivityQuery, ActivityItem>
{
  constructor(private readonly activityQUery: ActivityQuery) {}

  async execute(query: ReadActivityQuery): Promise<ActivityItem> {
    const res = await this.activityQUery.readActivity(query.uuid);
    return res;
  }
}

@QueryHandler(ReadTaskQuery)
export class ReadTaskHandler implements IQueryHandler<ReadTaskQuery, any> {
  constructor(private readonly taskQuery: TaskQuery) {}

  async execute(query: ReadTaskQuery): Promise<any> {
    return await this.taskQuery.readTask(query.uuid);
  }
}
