import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthDomain } from 'src/auth/domain/auth.domain';
import { AuthRepository } from '../../infrastructure/auth.repository';
import { SignOutCommand } from '../command/signout.command';

@CommandHandler(SignOutCommand)
export class SignOutHandler implements ICommandHandler<SignOutCommand, void> {
  @Inject()
  private readonly authenticationRepository: AuthRepository;
  @Inject()
  private readonly authenticationDomain: AuthDomain;

  async execute(command: SignOutCommand): Promise<void> {
    const model = await this.authenticationRepository.getAccountUUID(
      command.uuid,
      command.tenantId,
    );
    const account = this.authenticationDomain.signOut(model);
    await this.authenticationRepository.updateAccount(account);
  }
}
