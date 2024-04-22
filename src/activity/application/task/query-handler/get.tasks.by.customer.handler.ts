import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskQuery } from 'src/activity/insfrastructure/task/task.query';
import { GetTasksByCustomerQuery } from '../query/get.tasks.by.customer.query';
import { GetTasksByCustomerResult } from '../query/result/get.tasks.by.customer.query.result';

@QueryHandler(GetTasksByCustomerQuery)
export class GetTasksByCustomerHandler
  implements IQueryHandler<GetTasksByCustomerQuery, GetTasksByCustomerResult>
{
  constructor(private readonly taskQuery: TaskQuery) {}

  async execute(
    query: GetTasksByCustomerQuery,
  ): Promise<GetTasksByCustomerResult> {
    return this.taskQuery.getTasksByCustomer(
      query.tenantId,
      query.customerUUID,
      query.history,
    );
  }
}
