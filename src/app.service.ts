import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';

@Injectable()
export class AppService {
  @Inject()
  private readonly prisma: PrismaService;

  getHello(): string {
    return 'Hello World!';
  }

  async getDomain(): Promise<string[]> {
    const data = await this.prisma.tenant.findMany();
    return data.map((i) => i.domain);
  }
}
