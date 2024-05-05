import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserQuery } from 'src/user/infrastructure/user.query';
import { GetInfoUserQuery } from '../query/get.info.user.query';
import {
  GetInfoUserBusinessResult,
  GetInfoUserEmployeeResult,
  GetInfoUserIndividualResult,
} from '../query/result/get.info.user.query.result';

@QueryHandler(GetInfoUserQuery)
export class GetInfoUserHandler
  implements
    IQueryHandler<
      GetInfoUserQuery,
      | GetInfoUserEmployeeResult
      | GetInfoUserBusinessResult
      | GetInfoUserIndividualResult
    >
{
  @Inject()
  private readonly userQuery: UserQuery;

  async execute(
    query: GetInfoUserQuery,
  ): Promise<
    | GetInfoUserEmployeeResult
    | GetInfoUserBusinessResult
    | GetInfoUserIndividualResult
  > {
    return await this.userQuery.getInfoUser(query.uuid, query.tenantId);
  }
}
