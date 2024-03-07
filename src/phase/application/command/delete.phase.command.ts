import { ICommand } from '@nestjs/cqrs';

export class DeletePhaseCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeletePhaseCommand>) {
    Object.assign(this, data);
  }
}
