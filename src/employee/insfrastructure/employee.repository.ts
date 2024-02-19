import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateEmployeeCommand } from '../application/command/create.employee.command';
import { DeleteEmployeeCommand } from '../application/command/delete.employee.command';
import { UpdateEmployeeCommand } from '../application/command/update.employee.command';
export class EmployeeRespository {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;
  async createEmployee(command: CreateEmployeeCommand) {
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

    await this.prisma.employee.create({ data });
    return { uuid: data.uuid };
  }

  async updateEmployee(command: UpdateEmployeeCommand) {
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
    await this.prisma.employee.update({
      data,
      where: { uuid: command.uuid },
    });
  }
  async deleteEmployee(command: DeleteEmployeeCommand) {
    await this.prisma.employee.delete({ where: { uuid: command.uuid } });
  }
}
