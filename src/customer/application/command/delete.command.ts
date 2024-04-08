import { ICommand } from '@nestjs/cqrs';

export class DeleteCustomerCommand implements ICommand {
  uuids: string[];
  tenantId: string;
  constructor(readonly data: Partial<DeleteCustomerCommand>) {
    Object.assign(this, data);
  }
}
