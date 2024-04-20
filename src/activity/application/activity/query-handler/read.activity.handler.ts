import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActivityQuery } from 'src/activity/insfrastructure/activity/activity.query';
import { ReadActivityQuery } from '../query/read.activity.query';
import { ReadActivityResult } from '../query/result/read.activity.query.result';

@QueryHandler(ReadActivityQuery)
export class ReadActivityHandler
  implements IQueryHandler<ReadActivityQuery, ReadActivityResult>
{
  constructor(private readonly activityQUery: ActivityQuery) {}

  async execute(query: ReadActivityQuery): Promise<ReadActivityResult> {
    const res = await this.activityQUery.readActivity(
      query.uuid,
      query.tenantId,
    );
    return res;
  }
}
