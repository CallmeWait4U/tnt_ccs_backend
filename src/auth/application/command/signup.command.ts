import { ICommand } from '@nestjs/cqrs';
import { TypeAccount } from '@prisma/client';

export class SignUpCommand implements ICommand {
  username: string;
  password: string;
  passwordConfirm: string;
  type: TypeAccount;

  constructor(readonly data: Partial<SignUpCommand>) {
    Object.assign(this, data);
  }
}
