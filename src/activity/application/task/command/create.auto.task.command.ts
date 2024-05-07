import { ICommand } from '@nestjs/cqrs';

export class CreateAutoTaskCommand implements ICommand {
  title: string;
  note: string;
  customerUUID: string;
  tenantId: string;
  employees: string[];

  constructor(readonly data: Partial<CreateAutoTaskCommand>) {
    Object.assign(this, data);
  }
}
