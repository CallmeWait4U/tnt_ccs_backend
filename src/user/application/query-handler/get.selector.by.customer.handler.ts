import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserQuery } from 'src/user/infrastructure/user.query';
import { GetSelectorByCustomerQuery } from '../query/get.selector.by.customer.query';
import { SelectorEmployeeResult } from '../query/result/selector.employee.result';

@QueryHandler(GetSelectorByCustomerQuery)
export class GetSelectorByCustomerHandler
  implements IQueryHandler<GetSelectorByCustomerQuery, SelectorEmployeeResult>
{
  @Inject()
  private readonly userQuery: UserQuery;

  async execute(
    query: GetSelectorByCustomerQuery,
  ): Promise<SelectorEmployeeResult> {
    return await this.userQuery.getSelectorEmployee(
      query.tenantId,
      query.customerUUID,
    );
  }
}
