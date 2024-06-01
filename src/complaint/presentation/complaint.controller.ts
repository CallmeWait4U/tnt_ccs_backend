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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { CreateActivityComplaintCommand } from '../application/command/create.activity.complaint.command';
import { CreateComplaintCommand } from '../application/command/create.complaint.command';
import { CreateTypeComplaintCommand } from '../application/command/create.typeComplaint.command';
import { DeleteComplaintCommand } from '../application/command/delete.complaint.command';
import { DeleteTypeComplaintCommand } from '../application/command/delete.typeComplaint.command';
import { UpdateStatusComplaintCommand } from '../application/command/update.status.complaint.command';
import { UpdateTypeComplaintCommand } from '../application/command/update.typeComplaint.command';
import { GetActivitiesComplaintQuery } from '../application/query/get.activities.complaint.query';
import { GetComplaintsByCustomerQuery } from '../application/query/get.complaints.by.customer.query';
import { GetComplaintsQuery } from '../application/query/get.complaints.query';
import { GetSelectorTypeQuery } from '../application/query/get.selector.type.query';
import { ReadComplaintQuery } from '../application/query/read.complaint.query';
import { ReadTypeComplaintQuery } from '../application/query/read.typeComplaint.query';
import { SelectorComplaintByCustomerQuery } from '../application/query/selector.complaint.by.customer.dto';
import { CreateActivityComplaintDTO } from './dto/create.activity.complaint.dto';
import { CreateTypeComplaintDTO } from './dto/create.typeComplaint.dto';
import { DeleteActivityComplaintDTO } from './dto/delete.activity.complaint.dto';
import { DeleteComplaintDTO } from './dto/delete.complaint.dto';
import { DeleteTypeComplaintDTO } from './dto/delete.typeComplaint.dto';
import { GetActivitiesComplaintDTO } from './dto/get.activities.complaint.dto';
import { GetComplaintsDTO } from './dto/get.complaint.dto';
import { ReadComplaintDTO } from './dto/read.complaint.dto';
import { ReadTypeComplaintDTO } from './dto/read.typeComplaint.dto';
import { SelectorComplaintByCustomerDTO } from './dto/selector.complaint.by.customer.dto';
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

  @Get('/getByCustomer')
  async getComplaintsByCustomer(
    @Query() q: GetComplaintsDTO,
    @GetUser() user: User,
  ) {
    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetComplaintsByCustomerQuery(
      user.tenantId,
      offset,
      limit,
      user.uuid,
      q.searchModel,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/selector/byCustomer')
  async selectorComplaintByCustomer(
    @Query() q: SelectorComplaintByCustomerDTO,
    @GetUser() user: User,
  ) {
    const query = new SelectorComplaintByCustomerQuery(
      q.customerUUID,
      user.tenantId,
    );
    return await this.queryBus.execute(query);
  }

  @Get('/detail')
  async readComlaint(@Query() q: ReadComplaintDTO, @GetUser() user: User) {
    const query = new ReadComplaintQuery(q.uuid, user.tenantId);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async createComplaint(
    @Body() body: any,
    @UploadedFiles() images: Express.Multer.File[],
    @GetUser() user: User,
  ) {
    if (user.type !== 'CUSTOMER') {
      return new HttpException(
        "You don't have permission to access this resource",
        HttpStatus.FORBIDDEN,
      );
    }
    const dataComplaint = {} as any;
    for (const i in body) {
      if (i === 'valueFieldComplaint') {
        dataComplaint[i] = JSON.parse(body[i]);
      } else {
        dataComplaint[i] = body[i];
      }
    }
    const command = new CreateComplaintCommand({
      ...dataComplaint,
      images,
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
    // if (user.type !== 'CUSTOMER') {
    //   return new HttpException(
    //     "You don't have permission to access this resource",
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
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

  @Get('/activity/all')
  async getActivitiesComplaint(
    @Query() q: GetActivitiesComplaintDTO,
    @GetUser() user: User,
  ) {
    const query = new GetActivitiesComplaintQuery(
      user.tenantId,
      q.complaintUUID,
    );
    return await this.queryBus.execute(query);
  }

  @Post('/activity/create')
  async createActivityComplaint(
    @Body() body: CreateActivityComplaintDTO,
    @GetUser() user: User,
  ) {
    const command = new CreateActivityComplaintCommand({
      ...body,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
    return { message: 'SUCCESS' };
  }

  @Post('/activity/delete')
  async deleteActivityComplaint(
    @Body() body: DeleteActivityComplaintDTO,
    @GetUser() user: User,
  ) {
    const command = new CreateActivityComplaintCommand({
      ...body,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
    return { message: 'SUCCESS' };
  }
}
