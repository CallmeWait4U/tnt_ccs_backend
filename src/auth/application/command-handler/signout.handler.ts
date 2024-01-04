import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../../infrastructure/auth.repository';
import { SignOutCommand } from '../command/signout.command';

@CommandHandler(SignOutCommand)
export class SignOutHandler implements ICommandHandler<SignOutCommand, void> {
  @Inject()
  private readonly authenticationRepository: AuthRepository;

  async execute(command: SignOutCommand): Promise<void> {
    await this.authenticationRepository.signOut(command.data.id);
  }
}
