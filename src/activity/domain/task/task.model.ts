import { StatusTask } from '@prisma/client';
import { Expose } from 'class-transformer';

export class TaskModel {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  createDate: Date;

  @Expose()
  doneDate: Date;

  @Expose()
  status: StatusTask;

  @Expose()
  note: string;

  @Expose()
  autoAnnounceCus: boolean;

  @Expose()
  autoAnnounceEmp: boolean;

  @Expose()
  customerUUID: string;

  @Expose()
  activityUUID: string;
}
