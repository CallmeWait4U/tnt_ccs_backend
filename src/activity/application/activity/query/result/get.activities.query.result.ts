import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class ActivityItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  phaseName: string[];

  @Expose()
  totalTasks: number;
}

export class GetActivitiesResult implements IQueryResult {
  @Expose()
  items: ActivityItem[];

  @Expose()
  total: number;
}
