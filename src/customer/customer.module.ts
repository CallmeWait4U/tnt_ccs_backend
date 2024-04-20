import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCustomerHandler } from './application/command-handler/create.customer.handler';
import { DeleteCustomerHandler } from './application/command-handler/delete.customer.handler';
import { UpdateCustomerHandler } from './application/command-handler/update.customer.handler';
import { GetCustomersByEmployeeHandler } from './application/query-handler/get.customers.by.employee.handler';
import { GetCustomersHandler } from './application/query-handler/get.customers.handler';
import { ReadCustomerHandler } from './application/query-handler/read.customer.handler';
import { StatisticCustomerHandler } from './application/query-handler/statistic.customer.handler';
import { CustomerDomain } from './domain/customer.domain';
import { CustomerFactory } from './insfrastructure/customer.factory';
import { CustomerQuery } from './insfrastructure/customer.query';
import { CustomerRespository } from './insfrastructure/customer.repository';
import { CustomerController } from './presentation/customer.controller';

const application = [
  GetCustomersHandler,
  GetCustomersByEmployeeHandler,
  ReadCustomerHandler,
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
  StatisticCustomerHandler,
];

const infrastructure = [CustomerRespository, CustomerQuery, CustomerFactory];

const domain = [CustomerDomain];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [CustomerController],
})
export class CustomerModule {}
