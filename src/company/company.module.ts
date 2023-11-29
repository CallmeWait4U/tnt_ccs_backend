import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindAllHandler } from './application/query-handler/find.all.handler';
import { CompanyController } from './presentation/company.controller';

const application = [FindAllHandler];

const infrastructure = [];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [CompanyController],
})
export class CompanyModule {}
