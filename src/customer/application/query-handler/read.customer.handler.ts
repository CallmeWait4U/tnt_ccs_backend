import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerQuery } from 'src/customer/insfrastructure/customer.query';
import { ReadCustomerQuery } from '../query/customer.query';
import { CustomerItem } from '../query/result/customer.query.result';

@QueryHandler(ReadCustomerQuery)
export class ReadCustomerHandler
  implements IQueryHandler<ReadCustomerQuery, CustomerItem>
{
  constructor(private readonly customerQUery: CustomerQuery) {}

  async execute(query: ReadCustomerQuery): Promise<CustomerItem> {
    const res = await this.customerQUery.readCustomer(query.uuid);
    return res;
  }
}
