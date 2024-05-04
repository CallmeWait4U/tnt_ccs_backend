import { ICommand } from '@nestjs/cqrs';

export class CreateTaskCommand implements ICommand {
  startDate: Date;
  endDate: Date;
  createDate: Date;
  note: string;
  autoAnnounceCus: boolean;
  autoAnnounceEmp: boolean;
  activityUUID: string;
  customerUUID: string;
  tenantId: string;
  employees: string[];

  constructor(readonly data: Partial<CreateTaskCommand>) {
    Object.assign(this, data);
  }
}
