import { IQueryResult } from '@nestjs/cqrs';
import { StatusTask } from '@prisma/client';
import { Expose } from 'class-transformer';

export class Employee {
  @Expose()
  code: string;

  @Expose()
  name: string;
}

export class ReadTaskResult implements IQueryResult {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  customerName: string;

  @Expose()
  customerCode: string;

  @Expose()
  status: StatusTask;

  @Expose()
  doneDate: string;

  @Expose()
  activityName: string;

  @Expose()
  description: string;

  @Expose()
  createDate: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  @Expose()
  autoAnnounceCus: boolean;

  @Expose()
  autoAnnounceEmp: boolean;

  @Expose()
  note: string;

  @Expose()
  employees: Employee[];
}
