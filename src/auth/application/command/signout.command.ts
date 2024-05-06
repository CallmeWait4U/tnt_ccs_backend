import { ICommand } from '@nestjs/cqrs';

export class SignOutCommand implements ICommand {
  uuid: string;
  tenantId: string;

  constructor(readonly data: Partial<SignOutCommand>) {
    Object.assign(this, data);
  }
}
