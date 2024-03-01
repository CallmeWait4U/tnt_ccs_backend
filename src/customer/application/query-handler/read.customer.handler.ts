import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerQuery } from 'src/customer/insfrastructure/customer.query';
import { ReadCustomerQuery } from '../query/read.customer.query';
import {
  ReadBusinessResult,
  ReadIndividualResult,
} from '../query/result/read.customer.query.result';

@QueryHandler(ReadCustomerQuery)
export class ReadCustomerHandler
  implements
    IQueryHandler<ReadCustomerQuery, ReadBusinessResult | ReadIndividualResult>
{
  constructor(private readonly customerQuery: CustomerQuery) {}

  async execute(
    query: ReadCustomerQuery,
  ): Promise<ReadBusinessResult | ReadIndividualResult> {
    return await this.customerQuery.readCustomer(query.uuid);

    // if (customer?.isBusiness) {
    //   const business = await this.customerQuery.readBusiness(query.uuid);
    //   const res = new GetCustomerResult({
    //     business,
    //     individual: null,
    //     ...customer,
    //   });
    //   return res;
    // } else {
    //   const individual = await this.customerQuery.readInvididual(query.uuid);
    //   const res = new GetCustomerResult({
    //     business: null,
    //     individual,
    //     ...customer,
    //   });
    //   return res;
    // }
  }
}
