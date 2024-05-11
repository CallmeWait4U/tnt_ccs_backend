import { ICommand } from '@nestjs/cqrs';

export class RefreshTokensPairCommand implements ICommand {
  uuid: string;
  tenantId: string;
  domain: string;

  constructor(readonly data: Partial<RefreshTokensPairCommand>) {
    Object.assign(this, data);
  }
}
