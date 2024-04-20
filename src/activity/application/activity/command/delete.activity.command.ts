import { ICommand } from '@nestjs/cqrs';

export class DeleteActivityCommand implements ICommand {
  uuid: string;
  tenantId: string;

  constructor(readonly data: Partial<DeleteActivityCommand>) {
    Object.assign(this, data);
  }
}
