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

    await this.prisma.customer.create({ data });
    // if (command.isBusiness) {
    //   const dataBusiness = {
    //     name: command.name,
    //     code: command.code,
    //     isBusiness: command.isBusiness,
    //     source: command.source,
    //     city: command.city,
    //     district: command.district,
    //     detailAddress: command.detailAddress,
    //     email: command.email,
    //     phoneNumber: command.phoneNumber,
    //     description: command.description,
    //     receiveMail: command.receiveMail,
    //   };
    //   await this.prisma.business.create({ data: dataBusiness });
    // } else {
    //   const dataIndividual = {
    //     name: command.name,
    //     code: command.code,
    //     isBusiness: command.isBusiness,
    //     source: command.source,
    //     city: command.city,
    //     district: command.district,
    //     detailAddress: command.detailAddress,
    //     email: command.email,
    //     phoneNumber: command.phoneNumber,
    //     description: command.description,
    //     receiveMail: command.receiveMail,
    //   };
    //   await this.prisma.individual.create({ data: dataIndividual });
    // }
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
    // if (command.isBusiness){
    //   const dataBusiness = {
    //     name: command.name,
    //     code: command.code,
    //     isBusiness: command.isBusiness,
    //     source: command.source,
    //     city: command.city,
    //     district: command.district,
    //     detailAddress: command.detailAddress,
    //     email: command.email,
    //     phoneNumber: command.phoneNumber,
    //     description: command.description,
    //     receiveMail: command.receiveMail,
    //   };
    //   await this.prisma.business.update({ data: dataBusiness, where: { uuid: command.uuid } });

    // }
  }
  async deleteCustomer(command: DeleteCustomerCommand) {
    await this.prisma.customer.delete({ where: { uuid: command.uuid } });
  }
}
