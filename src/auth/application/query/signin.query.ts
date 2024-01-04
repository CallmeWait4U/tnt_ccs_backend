import { IQuery } from '@nestjs/cqrs';

export class SignInQuery implements IQuery {
  username: string;
  password: string;
  constructor(readonly data: Partial<SignInQuery>) {
    Object.assign(this, data);
  }
}
