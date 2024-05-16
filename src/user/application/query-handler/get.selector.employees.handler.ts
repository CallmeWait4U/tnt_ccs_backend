import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserQuery } from 'src/user/infrastructure/user.query';
import { GetSelectorEmployeesQuery } from '../query/get.selector.employees.query';
import { SelectorEmployeeResult } from '../query/result/selector.employee.result';

@QueryHandler(GetSelectorEmployeesQuery)
export class GetSelectorEmployeesHandler
  implements IQueryHandler<GetSelectorEmployeesQuery, SelectorEmployeeResult>
{
  @Inject()
  private readonly userQuery: UserQuery;

  async execute(
    query: GetSelectorEmployeesQuery,
  ): Promise<SelectorEmployeeResult> {
    return await this.userQuery.getSelectorEmployee(query.tenantId);
  }
}
