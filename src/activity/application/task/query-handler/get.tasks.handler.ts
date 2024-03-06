import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskQuery } from 'src/activity/insfrastructure/task/task.query';
import { GetTasksQuery } from '../query/get.tasks.query';
import { GetTasksResult } from '../query/result/get.tasks.query.result';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler
  implements IQueryHandler<GetTasksQuery, GetTasksResult>
{
  constructor(private readonly taskQuery: TaskQuery) {}

  async execute(query: GetTasksQuery): Promise<GetTasksResult> {
    return await this.taskQuery.getTasks(
      query.activityUUID,
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
