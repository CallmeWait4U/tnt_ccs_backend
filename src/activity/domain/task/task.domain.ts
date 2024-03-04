import { StatusTask } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { TaskModel } from './task.model';

export class TaskDomain {
  create(model: TaskModel): TaskModel | string {
    const taskUUID = uuidv4().toString();
    model.uuid = taskUUID;
    model.status =
      new Date() > new Date(model.endDate)
        ? StatusTask.INCOMING
        : StatusTask.OVERDUE;
    if (!model.customerUUID) return 'Không có UUID của khách hàng';
    if (!model.activityUUID) return 'Không có UUID của loại hoạt động';
    return model;
  }

  update(taskCurrent: TaskModel, taskUpdate: Partial<TaskModel>): TaskModel {
    for (const [prop, value] of Object.entries(taskCurrent)) {
      taskCurrent[prop] = taskUpdate[prop] ? taskUpdate[prop] : value;
    }
    return taskCurrent;
  }
}
