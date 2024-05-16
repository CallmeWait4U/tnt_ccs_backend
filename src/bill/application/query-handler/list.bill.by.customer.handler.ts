import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BillQuery } from 'src/bill/infrastructure/bill.query';
import { GetBillByCustomerQuery } from '../query/list.bill.by.customer.query';
import { GetBillByCustomerResult } from '../query/result/list.bill.by.customer.result';

@QueryHandler(GetBillByCustomerQuery)
export class GetBillByCustomerHandler
  implements IQueryHandler<GetBillByCustomerQuery, GetBillByCustomerResult>
{
  @Inject()
  private readonly billQuery: BillQuery;

  async execute(
    query: GetBillByCustomerQuery,
  ): Promise<GetBillByCustomerResult> {
    return await this.billQuery.getBillsByCustomer(
      query.customerUUID,
      query.tenantId,
    );
  }
}
