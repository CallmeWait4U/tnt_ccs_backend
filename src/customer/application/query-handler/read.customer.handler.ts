import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerQuery } from 'src/customer/insfrastructure/customer.query';
import { ReadCustomerQuery } from '../query/customer.query';
import { GetCustomerResult } from '../query/result/customer.query.result';

@QueryHandler(ReadCustomerQuery)
export class ReadCustomerHandler
  implements IQueryHandler<ReadCustomerQuery, GetCustomerResult>
{
  constructor(private readonly customerQUery: CustomerQuery) {}

  async execute(query: ReadCustomerQuery): Promise<GetCustomerResult> {
    const customer = await this.customerQUery.readCustomer(query.uuid);

    if (customer?.isBusiness) {
      const business = await this.customerQUery.readBusiness(query.uuid);
      const res = new GetCustomerResult({
        business,
        individual: null,
        ...customer,
      });
      return res;
    } else {
      const individual = await this.customerQUery.readInvididual(query.uuid);
      const res = new GetCustomerResult({
        business: null,
        individual,
        ...customer,
      });
      return res;
    }
  }
}
