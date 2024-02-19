import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmployeeRespository } from 'src/employee/insfrastructure/employee.repository';
import { UpdateEmployeeCommand } from '../command/update.employee.command';

@CommandHandler(UpdateEmployeeCommand)
export class UpdateEmployeeHandler
  implements ICommandHandler<UpdateEmployeeCommand, any>
{
  @Inject()
  private readonly employeeRespository: EmployeeRespository;

  async execute(command: UpdateEmployeeCommand): Promise<void> {
    return await this.employeeRespository.updateEmployee(command);
  }
}
