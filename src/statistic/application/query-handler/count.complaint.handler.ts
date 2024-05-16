import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StatisticQuery } from 'src/statistic/infrastructure/statistic.query';
import { CountComplaintQuery } from '../query/count.complaint.query';
import { CountComplaintResult } from '../query/result/count.complaint.query.result';

@QueryHandler(CountComplaintQuery)
export class CountComplaintHandler
  implements IQueryHandler<CountComplaintQuery, CountComplaintResult>
{
  @Inject()
  private readonly statisticQuery: StatisticQuery;

  async execute(query: CountComplaintQuery): Promise<CountComplaintResult> {
    return await this.statisticQuery.countComplaint(query.tenantId);
  }
}
