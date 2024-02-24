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
import { CreateActivityCommand } from '../application/command/create.activity.command';
import { DeleteActivityCommand } from '../application/command/delete.activity.command';
import { UpdateActivityCommand } from '../application/command/update.activity.command';
import {
  ListActivityQuery,
  ReadActivityQuery,
} from '../application/query/activity.query';
import { CreateActivityDTO } from './dto/create.activity.dto';
@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listActivitys(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const Offset = !offset || offset < 0 ? 0 : offset;
    const Limit = !limit || limit < 0 ? 10 : limit;
    const query = new ListActivityQuery(null, Offset, Limit);
    return await this.queryBus.execute(query);
  }
  @Get('/:uuid')
  async readActivity(@Param('uuid') uuid: string) {
    const query = new ReadActivityQuery(uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createActivity(@Body() body: CreateActivityDTO) {
    const command = new CreateActivityCommand(body);
    return await this.commandBus.execute(command);
  }
  @Put('/:uuid')
  async updateActivity(
    @Param('uuid') uuid: string,
    @Body() body: CreateActivityDTO,
  ) {
    const command = new UpdateActivityCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }
  @Delete('/:uuid')
  async deleteActivity(@Param('uuid') uuid: string) {
    const command = new DeleteActivityCommand({ uuid: uuid });
    return await this.commandBus.execute(command);
  }
}
