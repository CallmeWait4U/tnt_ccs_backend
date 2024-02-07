import { ICommand } from '@nestjs/cqrs';

export class DeleteCustomerCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteCustomerCommand>) {
    Object.assign(this, data);
  }
}
