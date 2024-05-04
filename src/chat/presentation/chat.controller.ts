import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { NotifyViaMailCommand } from '../application/command/notify.via.mail.command';
import { SendMessageToEmployeeCommand } from '../application/command/send.messageToEmployee.comand';
import { chatGateway } from './chat.gateway';
import { SendChatForEmployeeDTO } from './dto/send.messageToEmployee.dto';

@ApiTags('chats')
@Controller('chats')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class NotificationController {
  @Inject()
  private readonly chatGateway: chatGateway;

  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'notification.auto.sending',
    queue: 'tnt.ccs-notification.auto.sending',
  })
  async sendNotification(token: string) {
    console.log(token);
    await this.chatGateway.handleNotification(token, 'hello');
  }

  // @Cron('0 0 7 * * *')
  @Get('/autoSendMail')
  async notifyViaMail() {
    const command = new NotifyViaMailCommand();
    await this.commandBus.execute(command);
  }
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
  @Post('/sendMessageToEmployee')
  async sendMessageToEmployee(
    @Body() body: SendChatForEmployeeDTO,
    @GetUser() user: User,
  ) {
    if (user.type === 'CUSTOMER') {
      throw new HttpException('Only employee can send message', 403);
    }

    const command = new SendMessageToEmployeeCommand(
      user.uuid,
      body.receiverUUID,
      body.content,
    );
    return await this.commandBus.execute(command);
  }
}
