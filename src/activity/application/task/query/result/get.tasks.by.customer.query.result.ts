import { IQueryResult } from '@nestjs/cqrs';
import { StatusTask } from '@prisma/client';
import { Expose } from 'class-transformer';

export class GetTasksByCustomerItem {
  @Expose()
  uuid: string;

  @Expose()
  endDate: string;

  @Expose()
  doneDate: string;

  @Expose()
  status: StatusTask;

  @Expose()
  note: string;

  @Expose()
  title: string;

  @Expose()
  employeeName: string[];

  @Expose()
  activityUUID: string;
}

export class GetTasksByCustomerResult implements IQueryResult {
  @Expose()
  items: GetTasksByCustomerItem[];

  @Expose()
  total: number;
}
