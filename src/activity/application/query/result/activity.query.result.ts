import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class ActivityItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  description: string | null;
}
export class ListActivityResult implements IQueryResult {
  @Expose()
  items: ActivityItem[];

  @Expose()
  total: number;
}
export class TaskItem implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  createDate: Date;

  @Expose()
  doneDate?: Date;

  @Expose()
  status: number;

  @Expose()
  note: string;

  @Expose()
  employeeUUID: string;

  @Expose()
  activityUUID: string;

  @Expose()
  customerUUID: string;
}

export class ListTaskResult implements IQueryResult {
  @Expose()
  items: TaskItem[];

  @Expose()
  total: number;
}
