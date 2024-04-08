import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerQuery } from 'src/customer/insfrastructure/customer.query';
import { GetCustomersByEmployeeQuery } from '../query/get.customers.by.employee.query';
import { GetCustomersResult } from '../query/result/get.customers.query.result';

@QueryHandler(GetCustomersByEmployeeQuery)
export class GetCustomersByEmployeeHandler
  implements IQueryHandler<GetCustomersByEmployeeQuery, GetCustomersResult>
{
  constructor(private readonly customerQuery: CustomerQuery) {}

  async execute(
    query: GetCustomersByEmployeeQuery,
  ): Promise<GetCustomersResult> {
    return await this.customerQuery.getCustomersByEmployee(
      query.tenantId,
      query.accountUUID,
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
