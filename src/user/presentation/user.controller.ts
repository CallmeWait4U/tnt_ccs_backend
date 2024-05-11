import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { GetHomePageForEmployeeQuery } from '../application/query/get.home.page.for.employee.query';
import { GetInfoUserQuery } from '../application/query/get.info.user.query';
import { GetHomePageForEmployeeDTO } from './dto/get.home.page.for.employee.dto';

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

  @Get('/getHomepage')
  async getHomepageForEmployee(
    @Query() q: GetHomePageForEmployeeDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      throw new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const query = new GetHomePageForEmployeeQuery({
      uuid: user.uuid,
      tenantId: user.tenantId,
      ...q,
    });
    return await this.queryBus.execute(query);
  }
}
