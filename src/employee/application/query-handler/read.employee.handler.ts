import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EmployeeQuery } from 'src/employee/insfrastructure/employee.query';
import { ReadEmployeeQuery } from '../query/employee.query';
import { EmployeeItem } from '../query/result/employee.query.result';

@QueryHandler(ReadEmployeeQuery)
export class ReadEmployeeHandler
  implements IQueryHandler<ReadEmployeeQuery, EmployeeItem>
{
  constructor(private readonly employeeQUery: EmployeeQuery) {}

  async execute(query: ReadEmployeeQuery): Promise<EmployeeItem> {
    const res = await this.employeeQUery.readEmployee(query.uuid);
    return res;
  }
}
