import { ICommand } from '@nestjs/cqrs';

export class CreateNotificationCommand implements ICommand {
  title: string;
  content: string;
  time: Date;
  accountUUIDs: string[];
  tenantId: string;

  constructor(data: Partial<CreateNotificationCommand>) {
    Object.assign(this, data);
  }
}
