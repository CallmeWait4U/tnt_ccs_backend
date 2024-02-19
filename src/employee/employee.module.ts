import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEmployeeHandler } from './application/command-handler/create.employee.handler';
import { DeleteEpmloyeeHandler } from './application/command-handler/delete.employee.handler';
import { UpdateEmployeeHandler } from './application/command-handler/update.employee.handler';
import { ListEmployeesHandler } from './application/query-handler/list.employee.handler';
import { ReadEmployeeHandler } from './application/query-handler/read.employee.handler';
import { EmployeeQuery } from './insfrastructure/employee.query';
import { EmployeeRespository } from './insfrastructure/employee.repository';
import { EmployeeController } from './presentation/employee.controller';

const application = [
  ListEmployeesHandler,
  CreateEmployeeHandler,
  UpdateEmployeeHandler,
  DeleteEpmloyeeHandler,
  ReadEmployeeHandler,
];

const infrastructure = [EmployeeRespository, EmployeeQuery];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
