import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account, TypeAccount } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'libs/database.module';
import { SignUpCommand } from '../application/command/signup.command';
import { jwtConfig } from '../presentation/jwt/jwt.config';

export class AuthRepository {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;

  async createUser(command: SignUpCommand) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(command.password, salt);
    let type: TypeAccount;
    switch (command.type) {
      case 0: {
        type = 'ADMIN';
        break;
      }
      case 1: {
        type = 'EMPLOYEE';
        break;
      }
      case 2: {
        type = 'CUSTOMER';
        break;
      }
      default: {
        return new HttpException('Wrong Type', HttpStatus.BAD_REQUEST);
      }
    }
    const data = {
      username: command.username,
      password: hashPassword,
      type: type,
    };
    await this.prisma.account.create({ data });
  }

  async signIn(
    account: Account,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.generateTokenPair(account);
    const salt = await bcrypt.genSalt();
    const hashRefreshToken = await bcrypt.hash(tokens.refreshToken, salt);
    await this.prisma.account.update({
      data: {
        accessToken: tokens.accessToken,
        refreshToken: hashRefreshToken,
      },
      where: { id: account.id },
    });
    return tokens;
  }

  async signOut(id: string): Promise<void> {
    await this.prisma.account.update({
      data: {
        accessToken: null,
        refreshToken: null,
      },
      where: { id },
    });
  }

  async refresh(
    account: Account,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.generateTokenPair(account);
    await this.prisma.account.update({
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      where: { id: account.id },
    });
    return tokens;
  }

  async generateTokenPair(
    account: Account,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: account.id,
          username: account.username,
        },
        {
          secret: jwtConfig.access,
          expiresIn: jwtConfig.expiresIn.access,
        },
      ),
      this.jwtService.signAsync(
        {
          id: account.id,
          username: account.username,
        },
        {
          secret: jwtConfig.refresh,
          expiresIn: jwtConfig.expiresIn.refresh,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
