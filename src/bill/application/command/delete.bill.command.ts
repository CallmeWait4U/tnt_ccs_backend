import { ICommand } from '@nestjs/cqrs';

export class DeleteBillCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteBillCommand>) {
    Object.assign(this, data);
  }
}
