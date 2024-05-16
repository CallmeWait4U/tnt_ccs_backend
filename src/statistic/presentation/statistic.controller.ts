import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { CountCustomerFollowingSourceQuery } from '../application/query/count.customer.following.source.query';
import { CountCustomerPhaseByMonthQuery } from '../application/query/count.customer.phase.by.month.query';
import { CountCustomersByLocationQuery } from '../application/query/count.customers.by.location.query';
import { CountCustomersPerPhaseQuery } from '../application/query/count.customers.per.phase.query';
import { CountPriceQuoteAndBillQuery } from '../application/query/count.priceQuote.bill.query';
import { CountPriceQuoteByMonthQuery } from '../application/query/count.priceQuote.by.month.query';
import { CountCustomerPhaseByMonthDTO } from './dto/count.customer.phase.by.month.dto';
import { CountCustomersPerPhaseDTO } from './dto/count.customers.per.phase.dto';
import { CountPriceQuoteByMonthDTO } from './dto/count.priceQuote.by.month.dto';

@ApiTags('statistic')
@Controller('statistic')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class StatisticController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('/customersPerPhase')
  async countCustomersPerPhase(
    @Query() q: CountCustomersPerPhaseDTO,
    @GetUser() user: User,
  ) {
    const query = new CountCustomersPerPhaseQuery(user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Get('/customersByLocation')
  async countCustomersByLocation(@GetUser() user: User) {
    const query = new CountCustomersByLocationQuery(user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Get('/priceQuote-bill')
  async countPriceQuoteAndBill(@GetUser() user: User) {
    const query = new CountPriceQuoteAndBillQuery(user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Get('/customerFollowingSource')
  async countCustomersFollowingSource(@GetUser() user: User) {
    const query = new CountCustomerFollowingSourceQuery(user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Get('/customerPhaseByMonth')
  async countCustomerPhaseByMonth(
    @Query() q: CountCustomerPhaseByMonthDTO,
    @GetUser() user: User,
  ) {
    const query = new CountCustomerPhaseByMonthQuery(user.tenantId, q.option);
    return await this.queryBus.execute(query);
  }

  @Get('/priceQuoteByMonth')
  async countPriceQuoteByMonth(
    @Query() q: CountPriceQuoteByMonthDTO,
    @GetUser() user: User,
  ) {
    const query = new CountPriceQuoteByMonthQuery(user.tenantId, q.option);
    return await this.queryBus.execute(query);
  }
}
