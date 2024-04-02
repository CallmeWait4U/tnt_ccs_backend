import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PhaseQuery } from 'src/phase/infrastructure/phase.query';
import { GetPhasesQuery } from '../query/get.phase.query';
import { GetPhasesResult } from '../query/result/get.phase.query.result';

@QueryHandler(GetPhasesQuery)
export class GetPhasesHandler
  implements IQueryHandler<GetPhasesQuery, GetPhasesResult>
{
  constructor(private readonly phaseQuery: PhaseQuery) {}

  async execute(query: GetPhasesQuery): Promise<GetPhasesResult> {
    return await this.phaseQuery.getPhases(
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
