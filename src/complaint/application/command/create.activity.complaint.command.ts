import { ICommand } from '@nestjs/cqrs';

export class CreateActivityComplaintCommand implements ICommand {
  tenantId: string;
  note: string;
  doneDate: Date;
  employeeUUID: string;
  activityUUID: string;
  complaintUUID: string;

  constructor(data: Partial<CreateActivityComplaintCommand>) {
    Object.assign(this, data);
  }
}
