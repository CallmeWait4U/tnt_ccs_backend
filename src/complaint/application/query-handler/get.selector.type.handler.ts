import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { GetSelectorTypeQuery } from '../query/get.selector.type.query';
import { GetSelectorTypeResult } from '../query/result/get.selector.type.query.result';

@QueryHandler(GetSelectorTypeQuery)
export class GetSelectorTypeHandler
  implements IQueryHandler<GetSelectorTypeQuery, GetSelectorTypeResult>
{
  constructor(private readonly complaintQuery: ComplaintQuery) {}

  async execute(query: GetSelectorTypeQuery): Promise<GetSelectorTypeResult> {
    return await this.complaintQuery.getSelectorType(query.tenantId);
  }
}
