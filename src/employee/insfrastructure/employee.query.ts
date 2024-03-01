import { Inject } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'libs/database.module';
import { FirebaseService } from 'libs/firebase.module';

export class EmployeeQuery {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly firebase: FirebaseService;

  async listEmployee(offset: number, limit: number): Promise<Employee[]> {
    const skip = offset * limit;
    const res = await this.prisma.employee.findMany({
      take: parseInt(limit.toString()),
      skip: skip,
    });

    return res;
  }
  async readEmployee(uuid: string): Promise<Employee> {
    const res = await this.prisma.employee.findFirst({ where: { uuid: uuid } });
    if (!!res.avatar) {
      const avatarLink = res.avatar;
      res.avatar = (
        await this.firebase.getAuthenticatedFileUrl(avatarLink)
      ).toString();
    }
    return res;
  }
}
