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

export class TaskQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async listTask(
    activityUUID: string,
    offset: number,
    limit: number,
  ): Promise<any> {
    const skip = offset * limit;
    const res = await this.prisma.task.findMany({
      take: parseInt(limit.toString()),
      skip: skip,
      where: { activityUUID: activityUUID },
    });

    return res;
  }

  async readTask(uuid: string): Promise<any> {
    const res = await this.prisma.task.findFirst({
      where: { uuid: uuid },
    });
    return res;
  }
}
