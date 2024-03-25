import {
  Body,
  Controller,
  Delete,
  Get,
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
import { CreateBillCommand } from '../application/command/create.bill.command';
import { DeleteBillCommand } from '../application/command/delete.bill.command';
import { UpdateBillCommand } from '../application/command/update.bill.command';
import { GetBillsQuery } from '../application/query/list.bill.query';
import { ReadBillQuery } from '../application/query/read.bill.query';
import { CreateBillDTO } from './dto/create.bill.dto';
import { DeleteBillDTO } from './dto/delete.bill.dto';
import { GetBillsDTO } from './dto/list.bill.dto';
import { ReadBillDTO } from './dto/read.bill.dto';
import { UpdateBillDTO } from './dto/update.bill.dto';

@ApiTags('bills')
@Controller('bills')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class BillController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async listBills(@Query() q: GetBillsDTO, @GetUser() user: User) {
    let searchModel = q.searchModel;
    if (user.type === 'CUSTOMER') {
      searchModel = JSON.stringify({
        ...JSON.parse(q.searchModel),
        customerUUID: { isCustom: false, value: user.uuid, valueType: 'text' },
      });
    }

    const offset = !q.offset || q.offset < 0 ? 0 : q.offset;
    const limit = !q.limit || q.limit < 0 ? 10 : q.limit;
    const query = new GetBillsQuery(offset, limit, searchModel);
    return await this.queryBus.execute(query);
  }

  @Get('/:uuid')
  async readBill(@Param() q: ReadBillDTO, @GetUser() user: User) {
    console.log(user);
    const query = new ReadBillQuery(q.uuid);
    return await this.queryBus.execute(query);
  }

  @Post('')
  async createBill(@Body() body: CreateBillDTO) {
    const command = new CreateBillCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put('/:uuid')
  async updateBill(@Param('uuid') uuid: string, @Body() body: UpdateBillDTO) {
    const command = new UpdateBillCommand({ ...body, uuid });
    return await this.commandBus.execute(command);
  }

  @Delete('/:uuid')
  async deleteBill(@Param() body: DeleteBillDTO) {
    const command = new DeleteBillCommand(body);
    return await this.commandBus.execute(command);
  }
}
