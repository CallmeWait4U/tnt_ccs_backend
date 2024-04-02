import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import {
  ActivityItem,
  ListActivityResult,
} from '../application/query/result/activity.query.result';

export class ActivityQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async listActivity(
    offset: number,
    limit: number,
  ): Promise<ListActivityResult> {
    const [data, total] = await Promise.all([
      this.prisma.activity.findMany({
        skip: Number(offset),
        take: Number(limit),
        include: {
          _count: {
            select: { tasks: true },
          },
        },
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.account.count(),
    ]);
    return {
      items: data.map((item) => {
        return plainToClass(
          ActivityItem,
          { ...item, tasksCount: item._count.tasks },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readActivity(uuid: string): Promise<ActivityItem> {
    const res = await this.prisma.activity.findFirst({
      where: { uuid: uuid },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });
    if (res)
      return plainToClass(
        ActivityItem,
        { ...res, tasksCount: res._count.tasks },
        { excludeExtraneousValues: true },
      );
    return {} as ActivityItem;
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
