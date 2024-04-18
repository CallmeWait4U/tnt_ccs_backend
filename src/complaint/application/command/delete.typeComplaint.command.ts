import { ICommand } from '@nestjs/cqrs';

export class DeleteTypeComplaintCommand implements ICommand {
  uuid: string;
  tenantId: string;

  constructor(data: Partial<DeleteTypeComplaintCommand>) {
    Object.assign(this, data);
  }
}
