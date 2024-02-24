import { Inject } from '@nestjs/common';
import { Activity } from '@prisma/client';
import { PrismaService } from 'libs/database.module';

export class ActivityQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async listActivity(offset: number, limit: number): Promise<Activity[]> {
    const skip = offset * limit;
    const res = await this.prisma.activity.findMany({
      take: parseInt(limit.toString()),
      skip: skip,
    });

    return res;
  }
  async readActivity(uuid: string): Promise<Activity> {
    const res = await this.prisma.activity.findFirst({
      where: { uuid: uuid },
    });
    return res;
  }
}
