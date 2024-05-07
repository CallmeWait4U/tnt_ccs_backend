import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { SendMessageToEmployeeCommand } from '../application/command/send.messageToEmployee.comand';
import { ListChatCustomerQuery } from '../application/query/list.chatCustomer.query';
import { SendChatForEmployeeDTO } from './dto/send.messageToEmployee.dto';

@ApiTags('chats')
@Controller('chats')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ChatController {
  // @Inject()
  // private readonly chatGateway: chatGateway;

  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  // @RabbitRPC({
  //   exchange: 'exchange1',
  //   routingKey: 'notification.auto.sending',
  //   queue: 'tnt.ccs-notification.auto.sending',
  // })
  // async sendNotification(token: string) {
  //   console.log(token);
  //   await this.chatGateway.handleNotification(token, 'hello');
  // }

  // @Cron('0 0 7 * * *')
  // @Get('/autoSendMail')
  // async notifyViaMail() {
  //   const command = new NotifyViaMailCommand();
  //   await this.commandBus.execute(command);
  // }
  // @Get('/chatForClient/clientUUID/:uuid')
  // async getChatForClient(
  //   @Param() q: ListChatForClientDTO,
  //   @GetUser() user: User,
  // ) {
  //   const query = new ReadChatForClientQuery(q.uuid);
  //   return await this.queryBus.execute(query);
  // }
  // @Get('/chatForEmployee/employeeUUID/:uuid')
  // async getChatForEmployee(
  //   @Param() q: ListChatForEmployeeDTO,
  //   @GetUser() user: User,
  // ) {
  //   const query = new ReadChatForEmployeeQuery(q.uuid);
  //   return await this.queryBus.execute(query);
  // }
  @Post('/sendMessage')
  async sendMessageToEmployee(
    @Body() body: SendChatForEmployeeDTO,
    @GetUser() user: User,
  ) {
    let receiverUUID = body.receiverUUID;
    if (user.type === 'CUSTOMER') {
      receiverUUID = user.uuid;
    }
    const command = new SendMessageToEmployeeCommand(
      user.uuid,
      receiverUUID,
      body.content,
    );
    return await this.commandBus.execute(command);
  }

  @Get('/getChatForEmployee/:customerUUID')
  async listChatCustomer(
    @Param('customerUUID') customerUUID: string,
    @GetUser() user: User,
  ) {
    const isCustomer = false;
    const query = new ListChatCustomerQuery(
      user.tenantId,
      customerUUID,
      isCustomer,
      0,
      100,
    );
    return await this.queryBus.execute(query);
  }
  @Get('/getChatForCustomer')
  async listChatCustomerForCustomer(@GetUser() user: User) {
    const isCustomer = true;
    const query = new ListChatCustomerQuery(
      user.tenantId,
      user.uuid,
      isCustomer,
      0,
      100,
    );
    return await this.queryBus.execute(query);
  }
}
