import { ICommand } from '@nestjs/cqrs';

export class SendEmailTaskCommand implements ICommand {
  subject?: string;
  content: string;
  taskUUID: string;
  files: Express.Multer.File[];
  employeeUUID: string;
  tenantId: string;

  constructor(data: Partial<SendEmailTaskCommand>) {
    Object.assign(this, data);
  }
}
