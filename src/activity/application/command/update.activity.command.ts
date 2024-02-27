import { ICommand } from '@nestjs/cqrs';

export class UpdateActivityCommand implements ICommand {
  uuid: string;
  name: string;
  description: string;

  constructor(readonly data: Partial<UpdateActivityCommand>) {
    Object.assign(this, data);
  }
}
export class UpdateTaskCommand implements ICommand {
  uuid: string;
  startDate: Date;
  endDate: Date;
  createDate: Date;
  doneDate?: Date;
  status: number;
  note?: string;
  employeeUUID: string;
  activityUUID: string;
  customerUUID: string;
  constructor(readonly data: Partial<UpdateActivityCommand>) {
    Object.assign(this, data);
  }
}
