import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerQuery } from 'src/customer/insfrastructure/customer.query';
import { StatisticCustomerResult } from '../query/result/statistic.customer.result';
import { StatisticCustomerQuery } from '../query/statistic.customer.query';

@QueryHandler(StatisticCustomerQuery)
export class StatisticCustomerHandler
  implements IQueryHandler<StatisticCustomerQuery>
{
  constructor(private readonly customerQuery: CustomerQuery) {}

  async execute(
    query: StatisticCustomerQuery,
  ): Promise<StatisticCustomerResult> {
    return await this.customerQuery.statisticCustomer(query.tenantId);
  }
}
