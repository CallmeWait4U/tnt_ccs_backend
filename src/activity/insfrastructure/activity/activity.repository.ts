import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { ActivityModel } from '../../domain/activity/activity.model';
import { ActivityFactory } from './activity.factory';

export class ActivityRespository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly activityFactory: ActivityFactory;

  async create(activity: ActivityModel, phaseUUIDs: string[]): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tasks, phases, ...data } = activity;
    await this.prisma.activity.create({
      data: {
        ...data,
        phases: { connect: phaseUUIDs.map((uuid) => ({ uuid: uuid })) },
      },
    });
    return activity.uuid;
  }

  async update(activity: ActivityModel) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, tasks, phases, ...data } = activity;
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

  async getByUUID(uuid: string, tenantId: string): Promise<ActivityModel> {
    const entity = await this.prisma.activity.findUnique({
      where: { uuid, tenantId },
      include: { tasks: true, phases: true },
    });
    return this.activityFactory.createActivityModel(entity);
  }

  async getByUUIDs(
    uuids: string[] | string,
    tenantId: string,
  ): Promise<ActivityModel[]> {
    const entities = await this.prisma.activity.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] }, tenantId },
      include: { tasks: true },
    });
    return this.activityFactory.createActivityModels(entities);
  }
}
