import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { GetComplaintsQuery } from '../application/query/get.complaints.query';
import { ReadComplaintQuery } from '../application/query/read.complaint.query';
import { CreateComplaintDTO } from './dto/create.complaint.dto';
import { GetComplaintsDTO } from './dto/get.complaint.dto';
import { ReadComplaintDTO } from './dto/read.complaint.dto';

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
  }
}
