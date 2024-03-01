import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { AuthQuery } from '../../infrastructure/auth.query';
import { AuthRepository } from '../../infrastructure/auth.repository';
import { RefreshTokensPairCommand } from '../command/refreshTokenPair.command';

@CommandHandler(RefreshTokensPairCommand)
export class RefreshTokensPairHandler
  implements ICommandHandler<RefreshTokensPairCommand, any>
{
  @Inject()
  private readonly authenticationRepository: AuthRepository;
  @Inject()
  private readonly authenticationQuery: AuthQuery;

  async execute(
    command: RefreshTokensPairCommand,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authenticationQuery.getUserByUUID(
      command.data.uuid,
    );
    if (
      !user ||
      !user.refreshToken ||
      !bcrypt.compareSync(command.data.refreshToken, user.refreshToken)
    ) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
    return await this.authenticationRepository.refresh(user);
  }
}
