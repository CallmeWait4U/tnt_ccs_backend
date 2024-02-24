import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateActivityCommand } from '../application/command/create.activity.command';
import { DeleteActivityCommand } from '../application/command/delete.activity.command';
import { UpdateActivityCommand } from '../application/command/update.activity.command';
export class ActivityRespository {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;
  async createActivity(command: CreateActivityCommand) {
    const data = {
      name: command.name,
      code: command.code,
      gender: command.gender,
      position: command.position,
      avatar: command.avatar,
      city: command.city,
      district: command.district,
      detailAddress: command.detailAddress,
      email: command.email,
      phoneNumber: command.phoneNumber,
      description: command.description,
      uuid: uuidv4(),
      receiveMail: command.receiveMail,
    };

    await this.prisma.activity.create({ data });
    return { uuid: data.uuid };
  }

  async updateActivity(command: UpdateActivityCommand) {
    const data = {
      name: command.name,
      code: command.code,
      city: command.city,
      district: command.district,
      detailAddress: command.detailAddress,
      email: command.email,
      phoneNumber: command.phoneNumber,
      description: command.description,
      uuid: uuidv4(),
      receiveMail: command.receiveMail,
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
