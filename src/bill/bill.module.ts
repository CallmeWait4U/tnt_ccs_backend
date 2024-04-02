import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBillHandler } from './application/command-handler/create.bill.handler';
import { DeleteBillHandler } from './application/command-handler/delete.bill.handler';
import { UpdateBillHandler } from './application/command-handler/update.bill.handler';
import { GetBillsHandler } from './application/query-handler/list.bill.handler';
import { ReadBillHandler } from './application/query-handler/read.bill.handler';
import { BillDomain } from './domain/bill.domain';
import { BillFactory } from './infrastructure/bill.factory';
import { BillQuery } from './infrastructure/bill.query';
import { BillRepository } from './infrastructure/bill.repository';
import { BillController } from './presentation/bill.controller';

const application = [
  GetBillsHandler,
  ReadBillHandler,
  CreateBillHandler,
  UpdateBillHandler,
  DeleteBillHandler,
];

const infrastructure = [BillRepository, BillQuery, BillFactory];

const domain = [BillDomain];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [BillController],
})
export class BillModule {}
