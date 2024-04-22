import { ICommand } from '@nestjs/cqrs';

export class UpdateActivityCommand implements ICommand {
  uuid: string;
  name: string;
  description: string;
  phases: string[];
  tenantId: string;

  constructor(readonly data: Partial<UpdateActivityCommand>) {
    Object.assign(this, data);
  }
}
