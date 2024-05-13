import { ICommand } from '@nestjs/cqrs';

export class RejectAccountForCustomerCommand implements ICommand {
  customerUUID: string;
  tenantId: string;

  constructor(data: Partial<RejectAccountForCustomerCommand>) {
    Object.assign(this, data);
  }
}
