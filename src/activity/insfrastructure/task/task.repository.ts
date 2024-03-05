import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { TaskModel } from 'src/activity/domain/task/task.model';
import { TaskFactory } from './task.factory';

export class TaskRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly taskFactory: TaskFactory;

  async create(task: TaskModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customerUUID, activityUUID, id, ...data } = task;
    await this.prisma.task.create({
      data: {
        ...data,
        customer: { connect: { uuid: customerUUID } },
        activity: { connect: { uuid: activityUUID } },
      },
    });
    return data.uuid;
  }

  async delete(models: TaskModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.task.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string): Promise<TaskModel> {
    const entity = await this.prisma.customer.findUnique({
      where: { uuid },
      include: { business: true, individual: true },
    });
    return this.taskFactory.createTaskModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<TaskModel[]> {
    const entities = await this.prisma.task.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
    });
    return this.taskFactory.createTaskModels(entities);
  }
}
