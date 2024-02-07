import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerQuery } from 'src/customer/insfrastructure/customer.query';
import { ListCustomerQuery } from '../query/customer.query';
import { ListCustomersResult } from '../query/result/customer.query.result';

@QueryHandler(ListCustomerQuery)
export class ListCustomersHandler
  implements IQueryHandler<ListCustomerQuery, ListCustomersResult>
{
  constructor(private readonly listCustomerQuery: CustomerQuery) {}

  async execute(query: ListCustomerQuery): Promise<ListCustomersResult> {
    const dataItems = await this.listCustomerQuery.listCustomers(
      query.offset,
      query.limit,
    );
    const findAllResult = new ListCustomersResult();
    findAllResult.items = dataItems;
    findAllResult.total = dataItems.length;

    return findAllResult;
  }
}
