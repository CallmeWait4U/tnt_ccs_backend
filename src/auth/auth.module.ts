import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'libs/email.module';
import { RmqModule } from 'libs/rabbitmq.module';
import { ChangePasswordHandler } from './application/command-handler/change.password.handler';
import { RefreshTokensPairHandler } from './application/command-handler/refreshTokenPair.handler';
import { SignOutHandler } from './application/command-handler/signout.handler';
import { SignUpHandler } from './application/command-handler/signup.handler';
import { SignInHandler } from './application/query-handler/signin.handler';
import { AuthDomain } from './domain/auth.domain';
import { AuthFactory } from './infrastructure/auth.factory';
import { AuthQuery } from './infrastructure/auth.query';
import { AuthRepository } from './infrastructure/auth.repository';
import { AuthController } from './presentation/auth.controller';
import { jwtConfig } from './presentation/jwt/jwt.config';
import { AccessTokenStrategy } from './presentation/jwt/strategies/accessToken.strategies';
import { RefreshTokenStrategy } from './presentation/jwt/strategies/refreshToken.strategy';

const application = [
  SignInHandler,
  SignOutHandler,
  SignUpHandler,
  RefreshTokensPairHandler,
  ChangePasswordHandler,
];

const infrastructure = [AuthRepository, AuthQuery, AuthFactory];

const domain = [AuthDomain];

const strategies = [AccessTokenStrategy, RefreshTokenStrategy];

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConfig.access,
      signOptions: { expiresIn: jwtConfig.expiresIn.access },
    }),
    RmqModule,
    CqrsModule,
    EmailModule,
  ],
  providers: [...application, ...infrastructure, ...domain, ...strategies],
  controllers: [AuthController],
})
export class AuthModule {}
