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
    const customerUUID: string = uuidv4().toString();
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

        Customer: { connect: { uuid: customerUUID } }, // Liên kết với Customer
      };

      await this.prisma.business.create({ data: dataBusiness });
    } else if (command?.individual) {
      const dataIndividual = {
        ...command.individual,
        Customer: { connect: { uuid: customerUUID } }, // Liên kết với Customer
      };

      await this.prisma.individual.create({ data: dataIndividual });
    }

    return { uuid: data.uuid };
  }

  async updateCustomer(command: UpdateCustomerCommand) {
    const data = {
      name: command.name,
      code: command.code,
      source: command.source,
      city: command.city,
      district: command.district,
      detailAddress: command.detailAddress,
      email: command.email,
      phoneNumber: command.phoneNumber,
      description: command.description,
      receiveMail: command.receiveMail,
    };
    await this.prisma.customer.update({
      data,
      where: { uuid: command.uuid },
    });
    const customer = await this.prisma.customer.findFirst({
      where: { uuid: command.uuid },
    });
    if (customer.isBusiness && command?.business) {
      const dataBusiness = await this.prisma.business.findFirst({
        where: { customerUUID: command.uuid },
      });
      await this.prisma.business.update({
        data: command.business,
        where: { id: dataBusiness.id },
      });
    } else if (command?.individual) {
      const dataIndividual = await this.prisma.individual.findFirst({
        where: { customerUUID: command.uuid },
      });
      await this.prisma.individual.update({
        data: command.individual,
        where: { id: dataIndividual.id },
      });
    }
  }
  async deleteCustomer(command: DeleteCustomerCommand) {
    await this.prisma.individual.deleteMany({
      where: { customerUUID: command.uuid },
    });
    await this.prisma.business.deleteMany({
      where: { customerUUID: command.uuid },
    });
    await this.prisma.customer.delete({ where: { uuid: command.uuid } });
  }
}
