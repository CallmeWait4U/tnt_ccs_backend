import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmployeeRespository } from 'src/employee/insfrastructure/employee.repository';
import { DeleteEmployeeCommand } from '../command/delete.employee.command';

@CommandHandler(DeleteEmployeeCommand)
export class DeleteEmployeeHandler
  implements ICommandHandler<DeleteEmployeeCommand, any>
{
  @Inject()
  private readonly employeeRespository: EmployeeRespository;

  async execute(command: DeleteEmployeeCommand): Promise<void> {
    return await this.employeeRespository.deleteEmployee(command);
  }
}
