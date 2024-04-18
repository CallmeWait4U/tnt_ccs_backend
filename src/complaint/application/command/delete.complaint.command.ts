import { ICommand } from '@nestjs/cqrs';

export class DeleteComplaintCommand implements ICommand {
  uuids: string[];
  tenantId: string;

  constructor(data: Partial<DeleteComplaintCommand>) {
    Object.assign(this, data);
  }
}
