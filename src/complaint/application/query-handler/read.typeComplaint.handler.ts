import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { ReadTypeComplaintQuery } from '../query/read.typeComplaint.query';
import { ReadTypeComplaintResult } from '../query/result/read.typeComplaint.query.result';

@QueryHandler(ReadTypeComplaintQuery)
export class ReadTypeComplaintHandler
  implements IQueryHandler<ReadTypeComplaintQuery, ReadTypeComplaintResult>
{
  constructor(private readonly complaintQuery: ComplaintQuery) {}

  async execute(
    query: ReadTypeComplaintQuery,
  ): Promise<ReadTypeComplaintResult> {
    return await this.complaintQuery.readTypeComplaint(
      query.uuid,
      query.tenantId,
    );
  }
}
