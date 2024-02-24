import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActivityQuery } from 'src/activity/insfrastructure/activity.query';
import { ReadActivityQuery } from '../query/activity.query';
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
