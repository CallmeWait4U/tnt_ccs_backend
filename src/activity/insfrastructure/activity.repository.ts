import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateActivityCommand,
  CreateAssignActivityCommand,
} from '../application/command/create.activity.command';
import {
  DeleteActivityCommand,
  DeleteAssignActivityCommand,
} from '../application/command/delete.activity.command';
import {
  UpdateActivityCommand,
  UpdateAssignActivityCommand,
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

  async createAssignActivity(command: CreateAssignActivityCommand) {
    const data = {
      uuid: uuidv4(),
      createDate: command.createDate,
      startDate: command.startDate,
      endDate: command.endDate,
      doneDate: command.doneDate,
      status: command.status,
      note: command.note,
      activity: {
        connect: { uuid: command.activityUUID },
      },
      customer: {
        connect: { uuid: command.customerUUID },
      },
      employee: {
        connect: { uuid: command.employeeUUID },
      },
    };

    await this.prisma.assignActivity.create({ data });
    return { uuid: data.uuid };
  }

  async updateAssignActivity(command: UpdateAssignActivityCommand) {
    const data = {
      createDate: command.createDate,
      startDate: command.startDate,
      endDate: command.endDate,
      doneDate: command.doneDate,
      status: command.status,
      note: command.note,
      activity: {
        connect: { uuid: command.activityUUID },
      },
      customer: {
        connect: { uuid: command.customerUUID },
      },
      employee: {
        connect: { uuid: command.employeeUUID },
      },
    };
    await this.prisma.activity.update({
      data,
      where: { uuid: command.uuid },
    });
  }
  async deleteAssignActivity(command: DeleteAssignActivityCommand) {
    await this.prisma.activity.delete({ where: { uuid: command.uuid } });
  }
}
