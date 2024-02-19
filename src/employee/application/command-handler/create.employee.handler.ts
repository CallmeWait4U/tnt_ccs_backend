import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmployeeRespository } from 'src/employee/insfrastructure/employee.repository';
import { CreateEmployeeCommand } from '../command/create.employee.command';
@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler
  implements ICommandHandler<CreateEmployeeCommand, any>
{
  @Inject()
  private readonly employeeRespository: EmployeeRespository;

  async execute(command: CreateEmployeeCommand): Promise<any> {
    return await this.employeeRespository.createEmployee(command);
  }
}
