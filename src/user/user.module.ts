import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetHomePageForEmployeeHandler } from './application/query-handler/get.home.page.for.employee.handler';
import { GetInfoUserHandler } from './application/query-handler/get.info.user.handler';
import { GetSelectorByCustomerHandler } from './application/query-handler/get.selector.by.customer.handler';
import { GetSelectorEmployeesHandler } from './application/query-handler/get.selector.employees.handler';
import { UserQuery } from './infrastructure/user.query';
import { UserController } from './presentation/user.controller';

const application = [
  GetInfoUserHandler,
  GetHomePageForEmployeeHandler,
  GetSelectorByCustomerHandler,
  GetSelectorEmployeesHandler,
];

const infrastructure = [UserQuery];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [UserController],
})
export class UserModule {}
