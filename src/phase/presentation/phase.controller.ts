import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { CreatePhaseCommand } from '../application/command/create.phase.command';
import { DeletePhaseCommand } from '../application/command/delete.phase.command';
import { UpdatePhaseCommand } from '../application/command/update.phase.command';
import { GetPhasesQuery } from '../application/query/get.phase.query';
import { ListPhaseOptionsQuery } from '../application/query/list.phase.options.query';
import { ReadPhaseQuery } from '../application/query/read.phase.query';
import { CreatePhaseDTO } from './dto/create.phase.dto';
import { DeletePhaseDTO } from './dto/delete.phase.dto';
import { GetPhasesDTO } from './dto/get.phase.dto';
import { ReadPhaseDTO } from './dto/read.phase.dto';
import { UpdatePhaseDTO } from './dto/update.phase.dto';

@ApiTags('phases')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('phases')
export class PhaseController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async getPhases(@Query() q: GetPhasesDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetPhasesQuery(
      user.tenantId,
      offset,
      limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readPhase(@Param() q: ReadPhaseDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const query = new ReadPhaseQuery(q.uuid, user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createPhase(@Body() body: CreatePhaseDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new CreatePhaseCommand({
      ...body,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  async updatePhase(
    @Param('uuid') uuid: string,
    @Body() body: UpdatePhaseDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new UpdatePhaseCommand({
      ...body,
      uuid,
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Delete('/:uuid')
  async deleteCustomerCommand(
    @Param() body: DeletePhaseDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new DeletePhaseCommand({
      uuids: [body.uuid],
      tenantId: user.tenantId,
    });
    return await this.commandBus.execute(command);
  }

  @Get('/list-phase-options/all')
  async listPhaseOptions(@GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const query = new ListPhaseOptionsQuery(user.tenantId);
    return await this.queryBus.execute(query);
  }
}
