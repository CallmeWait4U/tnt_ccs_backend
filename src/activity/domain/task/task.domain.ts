import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusTask } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { EmailTaskModel, EmployeeType, TaskModel } from './task.model';

export class TaskDomain {
  create(
    model: TaskModel,
    activityName: string,
    employees: EmployeeType[],
  ): TaskModel | string {
    const taskUUID = uuidv4().toString();
    model.uuid = taskUUID;
    model.status =
      new Date() > new Date(model.endDate)
        ? StatusTask.INCOMING
        : StatusTask.OVERDUE;
    model.employees = employees;
    model.title = activityName;
    if (!model.customerUUID) return 'Không có UUID của khách hàng';
    if (!model.activityUUID) return 'Không có UUID của loại hoạt động';
    return model;
  }

  createAutoTask(model: TaskModel, employees: EmployeeType[]) {
    const taskUUID = uuidv4().toString();
    model.uuid = taskUUID;
    model.status = StatusTask.COMPLETED;
    model.startDate = new Date();
    model.endDate = new Date();
    model.createDate = new Date();
    model.autoAnnounceCus = false;
    model.autoAnnounceEmp = false;
    model.employees = employees;
    return model;
  }

  createEmailTask(model: EmailTaskModel) {
    const emailTaskUUID = uuidv4().toString();
    model.uuid = emailTaskUUID;
    model.sentDate = new Date();
    return model;
  }

  update(taskCurrent: TaskModel, taskUpdate: Partial<TaskModel>): TaskModel {
    for (const [prop, value] of Object.entries(taskCurrent)) {
      taskCurrent[prop] = taskUpdate[prop] ? taskUpdate[prop] : value;
    }
    return taskCurrent;
  }

  updateStatus(taskCurrent: TaskModel): TaskModel {
    taskCurrent.status = StatusTask.COMPLETED;
    taskCurrent.note = 'Hoàn thành';
    return taskCurrent;
  }

  checkTask(task: TaskModel[] | TaskModel | null) {
    if (!task)
      throw new HttpException('Tasks do not exist', HttpStatus.BAD_REQUEST);
  }
}
