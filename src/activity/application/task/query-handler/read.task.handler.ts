import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskQuery } from 'src/activity/insfrastructure/task/task.query';
import { ReadTaskQuery } from '../query/read.task.query';
import { ReadTaskResult } from '../query/result/read.task.query.result';

@QueryHandler(ReadTaskQuery)
export class ReadTaskHandler
  implements IQueryHandler<ReadTaskQuery, ReadTaskResult>
{
  constructor(private readonly taskQuery: TaskQuery) {}

  async execute(query: ReadTaskQuery): Promise<ReadTaskResult> {
    return await this.taskQuery.readTask(query.tenantId, query.uuid);
  }
}
