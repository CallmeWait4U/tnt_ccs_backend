import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { CreateComplaintCommand } from '../application/command/create.complaint.command';
import { CreateTypeComplaintCommand } from '../application/command/create.typeComplaint.command';
import { DeleteComplaintCommand } from '../application/command/delete.complaint.command';
import { DeleteTypeComplaintCommand } from '../application/command/delete.typeComplaint.command';
import { UpdateStatusComplaintCommand } from '../application/command/update.status.complaint.command';
import { UpdateTypeComplaintCommand } from '../application/command/update.typeComplaint.command';
import { GetComplaintsQuery } from '../application/query/get.complaints.query';
import { GetSelectorTypeQuery } from '../application/query/get.selector.type.query';
import { ReadComplaintQuery } from '../application/query/read.complaint.query';
import { ReadTypeComplaintQuery } from '../application/query/read.typeComplaint.query';
import { CreateComplaintDTO } from './dto/create.complaint.dto';
import { CreateTypeComplaintDTO } from './dto/create.typeComplaint.dto';
import { DeleteComplaintDTO } from './dto/delete.complaint.dto';
import { DeleteTypeComplaintDTO } from './dto/delete.typeComplaint.dto';
import { GetComplaintsDTO } from './dto/get.complaint.dto';
import { ReadComplaintDTO } from './dto/read.complaint.dto';
import { ReadTypeComplaintDTO } from './dto/read.typeComplaint.dto';
import { UpdateStatusComplaintDTO } from './dto/update.status.complaint.dto';
import { UpdateTypeComplaintDTO } from './dto/update.typeComplaint.dto';

@ApiTags('complaint')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('complaint')
export class ComplaintController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('/all')
  async getComplaints(@Query() q: GetComplaintsDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetComplaintsQuery(
      user.tenantId,
      offset,
      limit,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readComlaint(@Query() q: ReadComplaintDTO, @GetUser() user: User) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const query = new ReadComplaintQuery(q.uuid, user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  async createComplaint(
    @Body() body: CreateComplaintDTO,
    @GetUser() user: User,
  ) {
    if (user.type !== 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new CreateComplaintCommand({
      ...body,
      customerUUID: user.uuid,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
  }

  @Put('/update/status')
  async updateStatusComplaint(
    @Body() body: UpdateStatusComplaintDTO,
    @GetUser() user: User,
  ) {
    const command = new UpdateStatusComplaintCommand({
      ...body,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
  }

  @Delete('/delete')
  async deleteComplaint(
    @Body() body: DeleteComplaintDTO,
    @GetUser() user: User,
  ) {
    if (user.type !== 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new DeleteComplaintCommand({
      ...body,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
  }

  @Get('/type/detail')
  async readTypeComplaintDetail(
    @Query() q: ReadTypeComplaintDTO,
    @GetUser() user: User,
  ) {
    const query = new ReadTypeComplaintQuery(q.uuid, user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Get('/type/selector')
  async getSelectorType(@GetUser() user: User) {
    const query = new GetSelectorTypeQuery({ tenantId: user.tenantId });
    return await this.queryBus.execute(query);
  }

  @Post('type/create')
  async createTypeComplaint(
    @Body() body: CreateTypeComplaintDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new CreateTypeComplaintCommand({
      ...body,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
  }

  @Put('type/update')
  async updateTypeComplaint(
    @Body() body: UpdateTypeComplaintDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new UpdateTypeComplaintCommand({
      ...body,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
  }

  @Delete('/type/delete')
  async deleteTypeComplaint(
    @Body() body: DeleteTypeComplaintDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const command = new DeleteTypeComplaintCommand({
      ...body,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
  }
}
