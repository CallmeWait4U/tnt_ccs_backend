import { ICommand } from '@nestjs/cqrs';

export class UpdateStatusTaskCommand implements ICommand {
  uuid: string;
  tenantId: string;

  constructor(data: Partial<UpdateStatusTaskCommand>) {
    Object.assign(this, data);
  }
}
