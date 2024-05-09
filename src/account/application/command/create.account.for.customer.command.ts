import { ICommand } from '@nestjs/cqrs';
import { TypeAccount } from '@prisma/client';

export class CreateAccountForCustomerCommand implements ICommand {
  customerUUID: string;
  type: TypeAccount;
  tenantId: string;

  constructor(data: Partial<CreateAccountForCustomerCommand>) {
    Object.assign(this, data);
  }
}
