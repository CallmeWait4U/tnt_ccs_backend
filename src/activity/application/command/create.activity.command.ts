import { ICommand } from '@nestjs/cqrs';

export class CreateActivityCommand implements ICommand {
  uuid: string;
  name: string;
  description: string;

  constructor(readonly data: Partial<CreateActivityCommand>) {
    Object.assign(this, data);
  }
}
export class CreateAssignActivityCommand implements ICommand {
  uuid: string;
  startDate: Date;
  endDate: Date;
  createDate: Date;
  doneDate?: Date;
  status: number;
  note: string;
  employeeUUID: string;
  activityUUID: string;
  customerUUID: string;
  constructor(readonly data: Partial<CreateAssignActivityCommand>) {
    Object.assign(this, data);
  }
}
