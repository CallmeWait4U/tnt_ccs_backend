import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserQuery } from 'src/user/infrastructure/user.query';
import { GetHomePageForEmployeeQuery } from '../query/get.home.page.for.employee.query';
import { GetHomePageForEmployeeResult } from '../query/result/get.home.page.for.employee.query.result';

@QueryHandler(GetHomePageForEmployeeQuery)
export class GetHomePageForEmployeeHandler
  implements
    IQueryHandler<GetHomePageForEmployeeQuery, GetHomePageForEmployeeResult>
{
  @Inject()
  private readonly userQuery: UserQuery;

  async execute(
    query: GetHomePageForEmployeeQuery,
  ): Promise<GetHomePageForEmployeeResult> {
    return await this.userQuery.getHomePageForEmployee(
      query.uuid,
      query.tenantId,
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
