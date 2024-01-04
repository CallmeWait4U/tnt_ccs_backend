import { Inject } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'libs/database.module';

export class AuthQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async getUserById(id: string): Promise<Account | null> {
    const res = await this.prisma.account.findFirst({ where: { id } });
    return res ? res : null;
  }

  async findUser(username: string): Promise<Account | null> {
    const res = await this.prisma.account.findFirst({ where: { username } });
    return res ? res : null;
  }
}
