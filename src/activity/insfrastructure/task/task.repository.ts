import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { EmailTaskModel, TaskModel } from 'src/activity/domain/task/task.model';
import { TaskFactory } from './task.factory';

export class TaskRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly taskFactory: TaskFactory;

  async create(task: TaskModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customerUUID, activityUUID, id, employees, ...data } = task;
    await this.prisma.task.create({
      data: {
        ...data,
        customer: { connect: { uuid: customerUUID } },
        activity: { connect: { uuid: activityUUID } },
        employees: { connect: employees },
      },
    });
    return data.uuid;
  }

  async createEmailTask(emailTask: EmailTaskModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, employeeUUID, customerUUID, taskUUID, from, ...dataEmailTask } =
      emailTask;
    await this.prisma.emailTask.create({
      data: {
        ...dataEmailTask,
        from: { connect: { uuid: employeeUUID } },
        recipient: { connect: { uuid: customerUUID } },
        task: { connect: { uuid: taskUUID } },
      },
    });
    return emailTask.uuid;
  }

  async updateStatus(task: TaskModel): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customerUUID, activityUUID, id, employees, uuid, ...data } = task;
    await this.prisma.task.update({ data, where: { uuid } });
    return uuid;
  }

  async delete(models: TaskModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.task.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string, tenantId: string): Promise<TaskModel> {
    const entity = await this.prisma.customer.findUnique({
      where: { uuid, tenantId },
      include: { business: true, individual: true },
    });
    return this.taskFactory.createTaskModel(entity);
  }

  async getByUUIDs(
    uuids: string[] | string,
    tenantId: string,
  ): Promise<TaskModel[]> {
    const entities = await this.prisma.task.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] }, tenantId },
    });
    return this.taskFactory.createTaskModels(entities);
  }
}
