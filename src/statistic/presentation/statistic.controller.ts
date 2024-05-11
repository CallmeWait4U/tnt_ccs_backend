import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { CountCustomersPerPhaseQuery } from '../application/query/count.customers.per.phase.query';
import { CountCustomersPerPhaseDTO } from './dto/count.customers.per.phase.dto';

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
}
