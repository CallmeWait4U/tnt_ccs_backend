import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { EmployeeQuery } from 'src/employee/insfrastructure/employee.query';
import { ListEmployeeQuery } from '../query/employee.query';
import { ListEmployeeResult } from '../query/result/employee.query.result';

@QueryHandler(ListEmployeeQuery)
export class ListEmployeesHandler
  implements IQueryHandler<ListEmployeeQuery, ListEmployeeResult>
{
  constructor(private readonly listEmployeeQuery: EmployeeQuery) {}

  async execute(query: ListEmployeeQuery): Promise<ListEmployeeResult> {
    const dataItems = await this.listEmployeeQuery.listEmployee(
      query.offset,
      query.limit,
    );
    const listEmployeeResult = new ListEmployeeResult();
    listEmployeeResult.items = dataItems;
    listEmployeeResult.total = dataItems.length;

    return listEmployeeResult;
  }
}
