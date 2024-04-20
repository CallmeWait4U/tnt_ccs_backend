import { ICommand } from '@nestjs/cqrs';

export class DeleteTaskCommand implements ICommand {
  uuid: string;
  tenantId: string;

  constructor(readonly data: Partial<DeleteTaskCommand>) {
    Object.assign(this, data);
  }
}
