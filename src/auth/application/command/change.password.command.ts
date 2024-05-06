import { ICommand } from '@nestjs/cqrs';

export class ChangePasswordCommand implements ICommand {
  uuid: string; // accountUUID
  tenantId: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(data: Partial<ChangePasswordCommand>) {
    Object.assign(this, data);
  }
}
