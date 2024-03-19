import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  ActivityItem,
  GetActivitiesResult,
} from '../../application/activity/query/result/get.activities.query.result';
import { ReadActivityResult } from '../../application/activity/query/result/read.activity.query.result';

export class ActivityQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getActivities(
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetActivitiesResult> {
    const conditions = [];
    let numOfTasks = -1;
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        const { value } = this.util.buildSearch(item);
        if (prop === 'totalTasks') {
          numOfTasks = value;
        } else {
          obj[prop] = value;
          conditions.push(obj);
        }
      }
    }
    const data = await this.prisma.activity.findMany({
      skip: Number(offset),
      take: Number(limit),
      where: { AND: conditions },
      include: {
        _count: {
          select: { tasks: true },
        },
        phases: {
          select: { name: true },
        },
      },
    });
    if (numOfTasks >= 0) {
      const res = [];
      data.map((i) => {
        if (i._count.tasks === numOfTasks) {
          res.push(i);
        }
      });
      return {
        items: res.map((i) => {
          return plainToClass(
            ActivityItem,
            {
              ...i,
              totalTasks: i._count.tasks,
              phaseName: i.phases.map((p) => p.name),
            },
            { excludeExtraneousValues: true },
          );
        }),
        total: res.length,
      };
    }
    return {
      items: data.map((i) => {
        return plainToClass(
          ActivityItem,
          {
            ...i,
            totalTasks: i._count.tasks,
            phaseName: i.phases.map((p) => p.name),
          },
          { excludeExtraneousValues: true },
        );
      }),
      total: data.length,
    };
  }

  async readActivity(uuid: string): Promise<ReadActivityResult> {
    const res = await this.prisma.activity.findFirst({
      where: { uuid },
      include: {
        phases: {
          select: { name: true },
        },
      },
    });
    if (!res) {
      return {} as ReadActivityResult;
    }
    return plainToClass(
      ReadActivityResult,
      { ...res, phaseName: res.phases.map((p) => p.name) },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
