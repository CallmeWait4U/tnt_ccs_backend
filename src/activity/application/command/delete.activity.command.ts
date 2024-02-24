import { ICommand } from '@nestjs/cqrs';

export class DeleteActivityCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteActivityCommand>) {
    Object.assign(this, data);
  }
}
export class DeleteAssignActivityCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteAssignActivityCommand>) {
    Object.assign(this, data);
  }
}
