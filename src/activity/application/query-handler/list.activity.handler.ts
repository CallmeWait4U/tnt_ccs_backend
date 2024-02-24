import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ActivityQuery } from 'src/activity/insfrastructure/activity.query';
import { ListActivityQuery } from '../query/activity.query';
import { ListActivityResult } from '../query/result/activity.query.result';

@QueryHandler(ListActivityQuery)
export class ListActivitysHandler
  implements IQueryHandler<ListActivityQuery, ListActivityResult>
{
  constructor(private readonly listActivityQuery: ActivityQuery) {}

  async execute(query: ListActivityQuery): Promise<ListActivityResult> {
    const dataItems = await this.listActivityQuery.listActivity(
      query.offset,
      query.limit,
    );
    const listActivityResult = new ListActivityResult();
    listActivityResult.items = dataItems;
    listActivityResult.total = dataItems.length;

    return listActivityResult;
  }
}
