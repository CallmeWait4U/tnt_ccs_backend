import { ICommand } from '@nestjs/cqrs';

export class RefreshTokensPairCommand implements ICommand {
  id: string;
  refreshToken: string;

  constructor(readonly data: Partial<RefreshTokensPairCommand>) {
    Object.assign(this, data);
  }
}
