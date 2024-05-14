import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RmqModule } from 'libs/rabbitmq.module';
import { CreateActivityComplaintHandler } from './application/command-handler/create.activity.complaint.handler';
import { CreateComplaintHandler } from './application/command-handler/create.complaint.handler';
import { CreateTypeComplaintHandler } from './application/command-handler/create.typeComplaint.handler';
import { DeleteActivityComplaintHandler } from './application/command-handler/delete.activity.complaint.handler';
import { DeleteComplaintHandler } from './application/command-handler/delete.complaint.handler';
import { DeleteTypeComplaintHandler } from './application/command-handler/delete.typeComplaint.handler';
import { UpdateStatusComplaintHandler } from './application/command-handler/update.status.complaint.handler';
import { UpdateTypeComplaintHandler } from './application/command-handler/update.typeComplaint.handler';
import { GetActivitiesComplaintHandler } from './application/query-handler/get.activities.complaint.handler';
import { GetComplaintsHandler } from './application/query-handler/get.complaints.handler';
import { GetSelectorTypeHandler } from './application/query-handler/get.selector.type.handler';
import { ReadComplaintHandler } from './application/query-handler/read.complaint.handler';
import { ReadTypeComplaintHandler } from './application/query-handler/read.typeComplaint.handler';
import { ComplaintDomain } from './domain/complaint.domain';
import { ComplaintFactory } from './infrastructure/complaint.factory';
import { ComplaintQuery } from './infrastructure/complaint.query';
import { ComplaintRepository } from './infrastructure/complaint.repository';
import { ComplaintController } from './presentation/complaint.controller';

const application = [
  CreateComplaintHandler,
  CreateTypeComplaintHandler,
  CreateActivityComplaintHandler,
  DeleteComplaintHandler,
  DeleteTypeComplaintHandler,
  DeleteActivityComplaintHandler,
  GetComplaintsHandler,
  ReadComplaintHandler,
  GetSelectorTypeHandler,
  ReadTypeComplaintHandler,
  UpdateStatusComplaintHandler,
  UpdateTypeComplaintHandler,
  GetActivitiesComplaintHandler,
];

const infrastructure = [ComplaintRepository, ComplaintQuery, ComplaintFactory];

const domain = [ComplaintDomain];

@Module({
  imports: [CqrsModule, RmqModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [ComplaintController],
})
export class ComplaintModule {}
