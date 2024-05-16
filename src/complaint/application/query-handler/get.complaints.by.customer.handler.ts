import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { GetComplaintsByCustomerQuery } from '../query/get.complaints.by.customer.query';
import { GetComplaintsResult } from '../query/result/get.complaints.query.result';

@QueryHandler(GetComplaintsByCustomerQuery)
export class GetComplaintsByCustomerHandler
  implements IQueryHandler<GetComplaintsByCustomerQuery, GetComplaintsResult>
{
  constructor(private readonly complaintQuery: ComplaintQuery) {}

  async execute(
    query: GetComplaintsByCustomerQuery,
  ): Promise<GetComplaintsResult> {
    return await this.complaintQuery.getComplaintsByCustomer(
      query.tenantId,
      query.offset,
      query.limit,
      query.accountUUID,
      query.searchModel,
    );
  }
}
