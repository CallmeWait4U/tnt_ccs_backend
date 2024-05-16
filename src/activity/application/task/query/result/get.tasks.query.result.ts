import { IQueryResult } from '@nestjs/cqrs';
import { StatusTask } from '@prisma/client';
import { Expose } from 'class-transformer';

export class TaskItem {
  @Expose()
  uuid: string;

  @Expose()
  activityUUID: string;

  @Expose()
  createDate: Date;

  @Expose()
  customerName: string;

  @Expose()
  employeeName: string[];

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  status: StatusTask;
}

export class GetTasksResult implements IQueryResult {
  @Expose()
  items: TaskItem[];

  @Expose()
  total: number;
}
