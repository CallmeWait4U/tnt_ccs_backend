import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusTask } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeType, TaskModel } from './task.model';

export class TaskDomain {
  create(model: TaskModel, employees: EmployeeType[]): TaskModel | string {
    const taskUUID = uuidv4().toString();
    model.uuid = taskUUID;
    model.status =
      new Date() > new Date(model.endDate)
        ? StatusTask.INCOMING
        : StatusTask.OVERDUE;
    model.employees = employees;
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

  checkTask(task: TaskModel[] | TaskModel | null) {
    if (!task)
      throw new HttpException('Tasks do not exist', HttpStatus.BAD_REQUEST);
  }
}
