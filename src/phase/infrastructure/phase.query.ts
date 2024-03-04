import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  GetPhasesResult,
  PhaseItem,
} from '../application/query/result/get.phase.query.result';
import {
  ListPhaseOptionsResult,
  PhaseOptionItem,
} from '../application/query/result/list.phase.options.query.result';
import { ReadPhaseResult } from '../application/query/result/read.phase.query.result';

export class PhaseQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async getPhases(
    offset: number,
    limit: number,
    searchModel?: any,
  ): Promise<GetPhasesResult> {
    const conditions = [];
    const search: { [key: string]: any } = searchModel
      ? JSON.parse(searchModel)
      : undefined;
    if (search) {
      for (const [prop, item] of Object.entries(search)) {
        const obj = {};
        if (item.isCustom) {
          const { value } = this.util.buildSearch(item);
          if (prop === 'name') {
            conditions.push({ name: { some: { name: value } } });
          }
          if (prop === 'priority') {
            conditions.push({ priority: { some: { priority: value } } });
          }
          if (prop === 'description') {
            conditions.push({ description: { some: { description: value } } });
          }
        } else {
          const { value } = this.util.buildSearch(item);
          obj[prop] = value;
          conditions.push(obj);
        }
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.phase.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: { AND: conditions },

        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.phase.count({ where: { AND: conditions } }),
    ]);
    return {
      items: data.map((i) => {
        return plainToClass(
          PhaseItem,
          {
            ...i,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }

  async readPhase(uuid: string): Promise<ReadPhaseResult> {
    const res = await this.prisma.phase.findUnique({
      where: { uuid },
    });
    if (res) {
      return plainToClass(
        ReadPhaseResult,
        { ...res },
        { excludeExtraneousValues: true },
      );
    }
    return {} as ReadPhaseResult;
  }

  async listPhaseOptions(): Promise<ListPhaseOptionsResult> {
    const [data, total] = await Promise.all([
      this.prisma.phase.findMany({
        orderBy: [{ id: 'asc' }],
      }),
      this.prisma.phase.count(),
    ]);
    return {
      items: data.map((i) => {
        return plainToClass(
          PhaseOptionItem,
          {
            ...i,
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }
}
