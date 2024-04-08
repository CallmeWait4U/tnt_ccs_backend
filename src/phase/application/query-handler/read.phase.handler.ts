import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PhaseQuery } from 'src/phase/infrastructure/phase.query';
import { ReadPhaseQuery } from '../query/read.phase.query';
import { ReadPhaseResult } from '../query/result/read.phase.query.result';

@QueryHandler(ReadPhaseQuery)
export class ReadPhaseHandler
  implements IQueryHandler<ReadPhaseQuery, ReadPhaseResult>
{
  constructor(private readonly phaseQuery: PhaseQuery) {}

  async execute(query: ReadPhaseQuery): Promise<ReadPhaseResult> {
    return await this.phaseQuery.readPhase(query.tenantId, query.uuid);
  }
}
