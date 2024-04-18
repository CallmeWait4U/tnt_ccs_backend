import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { ReadComplaintQuery } from '../query/read.complaint.query';
import { ReadComplaintResult } from '../query/result/read.complaint.query.result';

@QueryHandler(ReadComplaintQuery)
export class ReadComplaintHandler
  implements IQueryHandler<ReadComplaintQuery, ReadComplaintResult>
{
  constructor(private readonly complaintQuery: ComplaintQuery) {}

  async execute(query: ReadComplaintQuery): Promise<ReadComplaintResult> {
    return await this.complaintQuery.readComplaint(query.uuid, query.tenantId);
  }
}
