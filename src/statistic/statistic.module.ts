import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CountCustomersPerPhaseHandler } from './application/query-handler/count.customer.per.phase.handler';
import { StatisticDomain } from './domain/statistic.domain';
import { StatisticQuery } from './infrastructure/statistic.query';
import { StatisticController } from './presentation/statistic.controller';

const application = [CountCustomersPerPhaseHandler];

const infrastructure = [StatisticQuery];

const domain = [StatisticDomain];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [StatisticController],
})
export class StatisticModule {}
