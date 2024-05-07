import { StatusTask } from '@prisma/client';
import { Expose } from 'class-transformer';

export class EmployeeType {
  @Expose()
  uuid: string;
}

export class TaskModel {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  title: string;

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

  @Expose()
  employees: EmployeeType[];

  @Expose()
  tenantId: string;
}

export class EmailTaskModel {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  sentDate: Date;

  @Expose()
  subject: string;

  @Expose()
  content: string;

  @Expose()
  from: EmployeeType;

  @Expose()
  employeeUUID: string;

  @Expose()
  customerUUID: string;

  @Expose()
  task: TaskModel;

  @Expose()
  taskUUID: string;

  @Expose()
  tenantId: string;
}
