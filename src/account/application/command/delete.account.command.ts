import { ICommand } from '@nestjs/cqrs';

export class DeleteAccountCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteAccountCommand>) {
    Object.assign(this, data);
  }
}
