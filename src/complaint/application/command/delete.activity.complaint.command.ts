import { ICommand } from '@nestjs/cqrs';

export class DeleteActivityComplaintCommand implements ICommand {
  uuid: string;
  tenantId: string;

  constructor(data: Partial<DeleteActivityComplaintCommand>) {
    Object.assign(this, data);
  }
}
