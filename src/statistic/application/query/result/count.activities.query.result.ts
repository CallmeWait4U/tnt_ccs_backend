import { IQueryResult } from '@nestjs/cqrs';
import { StatusTask } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CountStatusActivity {
  @Expose()
  numTask: number;

  @Expose()
  status: StatusTask;
}

export class CountActivitiesItem {
  @Expose()
  classification: CountStatusActivity[];

  @Expose()
  activityName: string;
}

export class CountActivitiesResult implements IQueryResult {
  @Expose()
  items: CountActivitiesItem[];

  @Expose()
  total: number;
}
