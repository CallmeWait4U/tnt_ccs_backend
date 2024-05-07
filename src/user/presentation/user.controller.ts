import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { GetInfoUserQuery } from '../application/query/get.info.user.query';

@ApiTags('user')
@Controller('/user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('/info')
  async getInfoUser(@GetUser() user: User) {
    const query = new GetInfoUserQuery({
      uuid: user.uuid,
      tenantId: user.tenantId,
    });
    return await this.queryBus.execute(query);
  }
}
