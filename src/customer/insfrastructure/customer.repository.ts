import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateCustomerCommand } from '../application/command/create.customer.command';
import { DeleteCustomerCommand } from '../application/command/delete.command';
import { UpdateCustomerCommand } from '../application/command/update.customer.command';
export class CustomerRespository {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;
  async createCustomer(command: CreateCustomerCommand) {
    const customerUUID = uuidv4().toString();
    const data = {
      name: command.name,
      code: command.code,
      isBusiness: command.isBusiness,
      source: command.source,
      city: command.city,
      district: command.district,
      detailAddress: command.detailAddress,
      email: command.email,
      phoneNumber: command.phoneNumber,
      description: command.description,
      uuid: customerUUID,
      receiveMail: command.receiveMail,
    };

    await this.prisma.customer.create({ data });
    if (command.isBusiness && command?.business) {
      const dataBusiness = {
        ...command?.business,
        customerUUID: customerUUID,
      };
      await this.prisma.business.create({
        data: dataBusiness,
      });
    } else if (command?.individual) {
      await this.prisma.individual.create({
        data: { ...command.individual, customerUUID: customerUUID },
      });
    }
    return { uuid: data.uuid };
  }

  async updateCustomer(command: UpdateCustomerCommand) {
    const data = {
      name: command.name,
      code: command.code,
      isBusiness: command.isBusiness,
      source: command.source,
      city: command.city,
      district: command.district,
      detailAddress: command.detailAddress,
      email: command.email,
      phoneNumber: command.phoneNumber,
      description: command.description,
      uuid: uuidv4(),
      receiveMail: command.receiveMail,
    };
    await this.prisma.customer.update({
      data,
      where: { uuid: command.uuid },
    });
    if (command.isBusiness && command?.business) {
      await this.prisma.business.update({
        data: command.business,
        where: { customerUUID: command.uuid },
      });
    } else if (command?.individual) {
      await this.prisma.individual.update({
        data: command.individual,
        where: { customerUUID: command.uuid },
      });
    }
  }
  async deleteCustomer(command: DeleteCustomerCommand) {
    await this.prisma.customer.delete({ where: { uuid: command.uuid } });
  }
}
