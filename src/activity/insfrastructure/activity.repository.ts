import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateActivityCommand,
  CreateTaskCommand,
} from '../application/command/create.activity.command';
import {
  DeleteActivityCommand,
  DeleteTaskCommand,
} from '../application/command/delete.activity.command';
import {
  UpdateActivityCommand,
  UpdateTaskCommand,
} from '../application/command/update.activity.command';
export class ActivityRespository {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;
  async createActivity(command: CreateActivityCommand) {
    const data = {
      uuid: uuidv4(),
      name: command.name,
      description: command.description,
    };

    await this.prisma.activity.create({ data });
    return { uuid: data.uuid };
  }

  async updateActivity(command: UpdateActivityCommand) {
    const data = {
      uuid: uuidv4(),
      name: command.name,
      description: command.description,
    };
    await this.prisma.activity.update({
      data,
      where: { uuid: command.uuid },
    });
  }
  async deleteActivity(command: DeleteActivityCommand) {
    await this.prisma.activity.delete({ where: { uuid: command.uuid } });
  }
}

export class TaskRespository {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;
  async createTask(command: CreateTaskCommand) {
    console.log('command in repository', command);
    const data = {
      uuid: uuidv4(),
      createDate: command.createDate,
      startDate: command.startDate,
      endDate: command.endDate,
      doneDate: command.doneDate,
      status: command.status,
      note: command.note,
      Activity: {
        connect: { uuid: command.activityUUID },
      },
      Customer: {
        connect: { uuid: command.customerUUID },
      },
      Employee: {
        connect: { uuid: command.employeeUUID },
      },
    };

    await this.prisma.task.create({ data });
    return { uuid: data.uuid };
  }

  async updateTask(command: UpdateTaskCommand) {
    const data = {
      createDate: command.createDate,
      startDate: command.startDate,
      endDate: command.endDate,
      doneDate: command.doneDate,
      status: command.status,
      note: command.note,
      Activity: {
        connect: { uuid: command.activityUUID },
      },
      Customer: {
        connect: { uuid: command.customerUUID },
      },
      Employee: {
        connect: { uuid: command.employeeUUID },
      },
    };
    await this.prisma.task.update({
      data,
      where: { uuid: command.uuid },
    });
  }
  async deleteTask(command: DeleteTaskCommand) {
    await this.prisma.task.delete({ where: { uuid: command.uuid } });
  }
}
