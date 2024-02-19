import { ICommand } from '@nestjs/cqrs';

export class DeleteEmployeeCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteEmployeeCommand>) {
    Object.assign(this, data);
  }
}
