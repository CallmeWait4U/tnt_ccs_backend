import { Task } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { TaskModel } from 'src/activity/domain/task/task.model';

export class TaskFactory extends BaseFactory {
  createTaskModel(task: Task | Partial<Task> | null) {
    if (!task) return null;
    return this.createModel(TaskModel, task);
  }

  createTaskModels(tasks: Task[] | Partial<Task>[] | null) {
    if (!tasks) return null;
    return tasks.map((task) => this.createTaskModel(task));
  }
}
