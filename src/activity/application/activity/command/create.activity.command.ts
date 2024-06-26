import { ICommand } from '@nestjs/cqrs';

export class CreateActivityCommand implements ICommand {
  name: string;
  description: string;
  phases: string[];
  tenantId: string;

  constructor(readonly data: Partial<CreateActivityCommand>) {
    Object.assign(this, data);
  }
}
