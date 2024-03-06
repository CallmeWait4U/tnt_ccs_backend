import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { ActivityModel } from '../../domain/activity/activity.model';
import { ActivityFactory } from './activity.factory';

export class ActivityRespository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly activityFactory: ActivityFactory;

  async create(activity: ActivityModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tasks, ...data } = activity;
    await this.prisma.activity.create({ data });
    return activity.uuid;
  }

  async update(activity: ActivityModel) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, tasks, ...data } = activity;
    await this.prisma.activity.update({
      data,
      where: { uuid },
    });
    return uuid;
  }

  async delete(models: ActivityModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.activity.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string): Promise<ActivityModel> {
    const entity = await this.prisma.activity.findUnique({
      where: { uuid },
      include: { tasks: true },
    });
    return this.activityFactory.createActivityModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<ActivityModel[]> {
    const entities = await this.prisma.activity.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
      include: { tasks: true },
    });
    return this.activityFactory.createActivityModels(entities);
  }
}
