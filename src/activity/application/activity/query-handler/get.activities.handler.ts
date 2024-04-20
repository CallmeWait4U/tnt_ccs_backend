import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActivityQuery } from 'src/activity/insfrastructure/activity/activity.query';
import { GetActivitiesQuery } from '../query/get.activities.query';
import { GetActivitiesResult } from '../query/result/get.activities.query.result';

@QueryHandler(GetActivitiesQuery)
export class GetActivitiesHandler
  implements IQueryHandler<GetActivitiesQuery, GetActivitiesResult>
{
  constructor(private readonly activityQuery: ActivityQuery) {}

  async execute(query: GetActivitiesQuery): Promise<GetActivitiesResult> {
    return await this.activityQuery.getActivities(
      query.tenantId,
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
