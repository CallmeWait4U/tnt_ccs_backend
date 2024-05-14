import { ICommand } from '@nestjs/cqrs';

export class SignOutCommand implements ICommand {
  uuid: string;
  tenantId: string;
  domain: string;

  constructor(readonly data: Partial<SignOutCommand>) {
    Object.assign(this, data);
  }
}
