import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { GetComplaintsQuery } from '../query/get.complaints.query';
import { GetComplaintsResult } from '../query/result/get.complaints.query.result';

@QueryHandler(GetComplaintsQuery)
export class GetComplaintsHandler
  implements IQueryHandler<GetComplaintsQuery, GetComplaintsResult>
{
  constructor(private readonly complaintQuery: ComplaintQuery) {}

  async execute(query: GetComplaintsQuery): Promise<GetComplaintsResult> {
    return await this.complaintQuery.getComplaints(
      query.tenantId,
      query.offset,
      query.limit,
      query.customerUUID,
      query.searchModel,
    );
  }
}
