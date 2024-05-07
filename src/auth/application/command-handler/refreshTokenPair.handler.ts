import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthDomain } from 'src/auth/domain/auth.domain';
import { AuthRepository } from '../../infrastructure/auth.repository';
import { RefreshTokensPairCommand } from '../command/refreshTokenPair.command';

@CommandHandler(RefreshTokensPairCommand)
export class RefreshTokensPairHandler
  implements
    ICommandHandler<
      RefreshTokensPairCommand,
      { accessToken: string; refreshToken: string }
    >
{
  @Inject()
  private readonly authenticationRepository: AuthRepository;
  @Inject()
  private readonly authenticationDomain: AuthDomain;

  async execute(
    command: RefreshTokensPairCommand,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const model = await this.authenticationRepository.getAccountUUID(
      command.uuid,
      command.tenantId,
    );
    const account = await this.authenticationDomain.refresh(model);
    return await this.authenticationRepository.updateAccount(account);
  }
}
