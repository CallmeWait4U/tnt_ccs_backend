import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreatePhaseCommand } from '../application/command/create.phase.command';
import { DeletePhaseCommand } from '../application/command/delete.phase.command';
import { UpdatePhaseCommand } from '../application/command/update.phase.command';
import { GetPhasesQuery } from '../application/query/get.phase.query';
import { ListPhaseOptionsQuery } from '../application/query/list.phase.options.query';
import { ReadPhaseQuery } from '../application/query/read.phase.query';
import { ListPhaseOptionsResult } from '../application/query/result/list.phase.options.query.result';
import { CreatePhaseDTO } from './dto/create.phase.dto';
import { DeletePhaseDTO } from './dto/delete.phase.dto';
import { GetPhasesDTO } from './dto/get.phase.dto';
import { ReadPhaseDTO } from './dto/read.phase.dto';
import { UpdatePhaseDTO } from './dto/update.phase.dto';

@ApiTags('phases')
@Controller('phases')
export class PhaseController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async getPhases(@Query() q: GetPhasesDTO) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetPhasesQuery(offset, limit, q.searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readPhase(@Param() q: ReadPhaseDTO) {
    const query = new ReadPhaseQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createPhase(@Body() body: CreatePhaseDTO) {
    const command = new CreatePhaseCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  async updatePhase(@Param('uuid') uuid: string, @Body() body: UpdatePhaseDTO) {
    const command = new UpdatePhaseCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }

  @Delete('/:uuid')
  async deleteCustomerCommand(@Param() body: DeletePhaseDTO) {
    const command = new DeletePhaseCommand(body);
    return await this.commandBus.execute(command);
  }

  @Get('/list-phase-options/all')
  async listPhaseOptions(): Promise<ListPhaseOptionsResult> {
    const query = new ListPhaseOptionsQuery();
    return await this.queryBus.execute(query);
  }
}
