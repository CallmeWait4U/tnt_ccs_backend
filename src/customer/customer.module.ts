import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCustomerHandler } from './application/command-handler/create.customer.handler';
import { DeleteCustomerHandler } from './application/command-handler/delete.customer.handler';
import { UpdateCustomerHandler } from './application/command-handler/update.customer.handler';
import { ListCustomersHandler } from './application/query-handler/list.customer.handler';
import { ReadCustomerHandler } from './application/query-handler/read.customer.handler';
import { CustomerQuery } from './insfrastructure/customer.query';
import { CustomerRespository } from './insfrastructure/customer.repository';
import { CustomerController } from './presentation/customer.controller';

const application = [
  ListCustomersHandler,
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
  ReadCustomerHandler,
];

const infrastructure = [CustomerRespository, CustomerQuery];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [CustomerController],
})
export class CustomerModule {}
