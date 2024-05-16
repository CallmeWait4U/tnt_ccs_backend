import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StatisticQuery } from 'src/statistic/infrastructure/statistic.query';
import { CountActivitiesQuery } from '../query/count.activities.query';
import { CountActivitiesResult } from '../query/result/count.activities.query.result';

@QueryHandler(CountActivitiesQuery)
export class CountActivitiesHandler
  implements IQueryHandler<CountActivitiesQuery, CountActivitiesResult>
{
  @Inject()
  private readonly statisticQuery: StatisticQuery;

  async execute(query: CountActivitiesQuery): Promise<CountActivitiesResult> {
    return await this.statisticQuery.countActivities(query.tenantId);
  }
}
