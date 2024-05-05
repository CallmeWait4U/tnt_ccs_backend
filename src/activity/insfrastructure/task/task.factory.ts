import { EmailTask, Prisma, Task } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { EmailTaskModel, TaskModel } from 'src/activity/domain/task/task.model';

type EmailTaskEntity = Prisma.EmailTaskGetPayload<{
  include: { from: true; recipient: true; task: true };
}>;

export class TaskFactory extends BaseFactory {
  createTaskModel(task: Task | Partial<Task> | null) {
    if (!task) return null;
    return this.createModel(TaskModel, task);
  }

  createTaskModels(tasks: Task[] | Partial<Task>[] | null) {
    if (!tasks) return null;
    return tasks.map((task) => this.createTaskModel(task));
  }

  createEmailTaskModel(
    emailTask: Partial<EmailTaskEntity> | Partial<EmailTask> | null,
  ) {
    if (!emailTask) return null;
    return this.createModel(EmailTaskModel, emailTask);
  }

  createEmailTaskModels(
    emailTasks: Partial<EmailTaskEntity>[] | Partial<EmailTask>[] | null,
  ) {
    if (!emailTasks) return null;
    return emailTasks.map((emailTask) => this.createTaskModel(emailTask));
  }
}
