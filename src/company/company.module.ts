import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ListCompanyHandler } from './application/query-handler/list.company.handler';
import { CompanyQuery } from './insfrastructure/company.query';
import { CompanyController } from './presentation/company.controller';

const application = [ListCompanyHandler];

const infrastructure = [CompanyQuery];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [CompanyController],
})
export class CompanyModule {}
