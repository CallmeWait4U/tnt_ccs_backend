import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { SelectorComplaintByCustomerResult } from '../query/result/selector.complaint.by.customer.query.result';
import { SelectorComplaintByCustomerQuery } from '../query/selector.complaint.by.customer.dto';

@QueryHandler(SelectorComplaintByCustomerQuery)
export class SelectorComplaintByCustomerHandler
  implements
    IQueryHandler<
      SelectorComplaintByCustomerQuery,
      SelectorComplaintByCustomerResult
    >
{
  @Inject()
  private readonly complaintQuery: ComplaintQuery;

  async execute(
    query: SelectorComplaintByCustomerQuery,
  ): Promise<SelectorComplaintByCustomerResult> {
    return await this.complaintQuery.selectorComplaintByCustomer(
      query.customerUUID,
      query.tenantId,
    );
  }
}
