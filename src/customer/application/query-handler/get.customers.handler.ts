import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerQuery } from 'src/customer/insfrastructure/customer.query';
import { GetCustomersQuery } from '../query/get.customers.query';
import { GetCustomersResult } from '../query/result/get.customers.query.result';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler
  implements IQueryHandler<GetCustomersQuery, GetCustomersResult>
{
  constructor(private readonly customerQuery: CustomerQuery) {}

  async execute(query: GetCustomersQuery): Promise<GetCustomersResult> {
    return await this.customerQuery.getCustomers(
      query.tenantId,
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
