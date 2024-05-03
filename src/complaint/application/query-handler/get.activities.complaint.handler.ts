import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { GetActivitiesComplaintQuery } from '../query/get.activities.complaint.query';
import { GetActivitiesComplaintResult } from '../query/result/get.activities.complaint.query.result';

@QueryHandler(GetActivitiesComplaintQuery)
export class GetActivitiesComplaintHandler
  implements
    IQueryHandler<GetActivitiesComplaintQuery, GetActivitiesComplaintResult>
{
  constructor(private readonly complaintQuery: ComplaintQuery) {}

  async execute(
    query: GetActivitiesComplaintQuery,
  ): Promise<GetActivitiesComplaintResult> {
    return await this.complaintQuery.getActivtiesComplaint(
      query.complaintUUID,
      query.tenantId,
    );
  }
}
