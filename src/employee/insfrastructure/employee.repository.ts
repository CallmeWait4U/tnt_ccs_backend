import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'libs/database.module';
import { FirebaseService } from 'libs/firebase.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateEmployeeCommand } from '../application/command/create.employee.command';
import { DeleteEmployeeCommand } from '../application/command/delete.employee.command';
import { UpdateEmployeeCommand } from '../application/command/update.employee.command';
export class EmployeeRespository {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly firebase: FirebaseService;
  async createEmployee(command: CreateEmployeeCommand) {
    let avatarUrl: string | null = null;

    if (!!command.avatar) {
      avatarUrl = await this.firebase.uploadImage(command.avatar);
    }
    const data = {
      uuid: uuidv4(),
      name: command.name,
      code: command.code,
      gender: command.gender,
      position: command.position,
      city: command.city,
      district: command.district,
      detailAddress: command.detailAddress,
      email: command.email,
      phoneNumber: command.phoneNumber,
      description: command.description,
      avatar: avatarUrl,
      receiveMail: command.receiveMail,
    };

    await this.prisma.employee.create({ data });
    return { uuid: data.uuid };
  }

  async updateEmployee(command: UpdateEmployeeCommand) {
    let avatarUrl: string | null = null;

    if (command.isChangeImage && !!command.avatar) {
      avatarUrl = await this.firebase.uploadImage(command.avatar);
    }
    const newAvatar = command.isChangeImage
      ? !!command.avatar
        ? avatarUrl
        : null
      : undefined;
    const data = {
      name: command.name,
      code: command.code,
      city: command.city,
      district: command.district,
      detailAddress: command.detailAddress,
      email: command.email,
      phoneNumber: command.phoneNumber,
      description: command.description,
      receiveMail: command.receiveMail,
      avatar: newAvatar,
    };
    await this.prisma.employee.update({
      data,
      where: { uuid: command.uuid },
    });
  }
  async deleteEmployee(command: DeleteEmployeeCommand) {
    await this.prisma.employee.delete({ where: { uuid: command.uuid } });
  }
}
