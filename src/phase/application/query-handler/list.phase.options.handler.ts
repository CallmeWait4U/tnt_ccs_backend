import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PhaseQuery } from 'src/phase/infrastructure/phase.query';
import { ListPhaseOptionsQuery } from '../query/list.phase.options.query';
import { ListPhaseOptionsResult } from '../query/result/list.phase.options.query.result';

@QueryHandler(ListPhaseOptionsQuery)
export class ListPhaseOptionsHandler
  implements IQueryHandler<ListPhaseOptionsQuery, ListPhaseOptionsResult>
{
  constructor(private readonly phaseQuery: PhaseQuery) {}

  async execute(): Promise<ListPhaseOptionsResult> {
    console.log('listPhaseOptions handler');
    return await this.phaseQuery.listPhaseOptions();
  }
}
