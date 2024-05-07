import { Inject } from '@nestjs/common';
import { TypeAccount } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import {
  GetInfoUserBusinessResult,
  GetInfoUserEmployeeResult,
  GetInfoUserIndividualResult,
} from '../application/query/result/get.info.user.query.result';

export class UserQuery {
  @Inject()
  private readonly prisma: PrismaService;

  async getInfoUser(
    uuid: string,
    tenantId: string,
  ): Promise<
    | GetInfoUserBusinessResult
    | GetInfoUserIndividualResult
    | GetInfoUserEmployeeResult
  > {
    const account = await this.prisma.account.findUnique({
      where: { uuid, tenantId },
      include: {
        customer: {
          include: {
            individual: true,
            business: true,
            phase: {
              select: {
                name: true,
              },
            },
          },
        },
        employee: true,
      },
    });
    if (account.type !== TypeAccount.CUSTOMER) {
      return plainToClass(GetInfoUserEmployeeResult, account.employee, {
        excludeExtraneousValues: true,
      });
    }
    if (account.customer.isBusiness) {
      return plainToClass(GetInfoUserBusinessResult, {
        ...account.customer,
        ...account.customer.business,
        phaseName: account.customer.phase.name,
      });
    }
    return plainToClass(GetInfoUserIndividualResult, {
      ...account.customer,
      ...account.customer.individual,
      phaseName: account.customer.phase.name,
    });
  }
}
