import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthDomain } from 'src/auth/domain/auth.domain';
import { AuthRepository } from 'src/auth/infrastructure/auth.repository';
import { ChangePasswordCommand } from '../command/change.password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand, string>
{
  @Inject()
  private readonly authenticationRepository: AuthRepository;
  @Inject()
  private readonly authenticationDomain: AuthDomain;

  async execute(command: ChangePasswordCommand): Promise<string> {
    const account = await this.authenticationRepository.getAccountUUID(
      command.uuid,
      command.tenantId,
    );
    const model = await this.authenticationDomain.changePassword(
      account,
      command.oldPassword,
      command.newPassword,
      command.confirmPassword,
    );
    return await this.authenticationRepository.updatePassword(model);
  }
}
