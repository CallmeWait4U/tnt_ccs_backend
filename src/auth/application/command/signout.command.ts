import { ICommand } from '@nestjs/cqrs';

export class SignOutCommand implements ICommand {
  id: string;

  constructor(readonly data: Partial<SignOutCommand>) {
    Object.assign(this, data);
  }
}
