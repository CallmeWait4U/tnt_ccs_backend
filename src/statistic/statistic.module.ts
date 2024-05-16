import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CountActivitiesHandler } from './application/query-handler/count.activities.handler';
import { CountComplaintHandler } from './application/query-handler/count.complaint.handler';
import { CountCustomerFollowingSourceHandler } from './application/query-handler/count.customer.following.source.handler';
import { CountCustomersPerPhaseHandler } from './application/query-handler/count.customer.per.phase.handler';
import { CountCustomerPhaseByMonthHandler } from './application/query-handler/count.customer.phase.by.month.handler';
import { CountCustomersByLocationHandler } from './application/query-handler/count.customers.by.location.handler';
import { CountPriceQuoteAndBillHandler } from './application/query-handler/count.priceQuote.bill.handler';
import { CountPriceQuoteByMonthHandler } from './application/query-handler/count.priceQuote.by.month.handler';
import { StatisticDomain } from './domain/statistic.domain';
import { StatisticQuery } from './infrastructure/statistic.query';
import { StatisticController } from './presentation/statistic.controller';

const application = [
  CountCustomersPerPhaseHandler,
  CountCustomerFollowingSourceHandler,
  CountPriceQuoteAndBillHandler,
  CountCustomerPhaseByMonthHandler,
  CountPriceQuoteByMonthHandler,
  CountCustomersByLocationHandler,
  CountComplaintHandler,
  CountActivitiesHandler,
];

const infrastructure = [StatisticQuery];

const domain = [StatisticDomain];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [StatisticController],
})
export class StatisticModule {}
