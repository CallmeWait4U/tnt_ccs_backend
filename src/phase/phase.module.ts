import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RmqModule } from 'libs/rabbitmq.module';
import { CreatePhaseHandler } from './application/command-handler/create.phase.handler';
import { DeletePhaseHandler } from './application/command-handler/delete.phase.handler';
import { UpdatePhaseHandler } from './application/command-handler/update.phase.handler';
import { GetPhasesHandler } from './application/query-handler/get.phase.handler';
import { ListPhaseOptionsHandler } from './application/query-handler/list.phase.options.handler';
import { ReadPhaseHandler } from './application/query-handler/read.phase.handler';
import { PhaseDomain } from './domain/phase.domain';
import { PhaseFactory } from './infrastructure/phase.factory';
import { PhaseQuery } from './infrastructure/phase.query';
import { PhaseRepository } from './infrastructure/phase.repository';
import { PhaseController } from './presentation/phase.controller';

const application = [
  GetPhasesHandler,
  ReadPhaseHandler,
  CreatePhaseHandler,
  UpdatePhaseHandler,
  DeletePhaseHandler,
  ListPhaseOptionsHandler,
];

const infrastructure = [PhaseRepository, PhaseQuery, PhaseFactory];

const domain = [PhaseDomain];

@Module({
  imports: [CqrsModule, RmqModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [PhaseController],
})
export class PhaseModule {}
