import { ICommand } from '@nestjs/cqrs';

export class DeleteActivityCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteActivityCommand>) {
    Object.assign(this, data);
  }
}
export class DeleteTaskCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteTaskCommand>) {
    Object.assign(this, data);
  }
}
