import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { Cron } from '@nestjs/schedule';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { CreateNotificationCommand } from '../application/command/create.notification.command';
import { NotifyViaMailCommand } from '../application/command/notify.via.mail.command';
import { GetNotificationsQuery } from '../application/query/get.notifications.query';
import { CreateNotificationDTO } from './dto/create.notification.dto';
import { NotificationGateway } from './notification.gateway';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class NotificationController {
  @Inject()
  private readonly notificationGateway: NotificationGateway;

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
    await this.notificationGateway.handleNotification(token, 'hello');
  }

  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'notify.conplaint',
    queue: 'tnt.ccs-notify.conplaint',
  })
  async notifyComplaint(payload: CreateNotificationDTO) {
    console.log(payload);
    const command = new CreateNotificationCommand(payload);
    await this.commandBus.execute(command);
    await this.notificationGateway.notifyComplaint(payload);
  }

  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'handle.logout',
    queue: 'tnt.ccs-handle.logout',
  })
  async handleLogout(token: string) {
    await this.notificationGateway.handleLogout(token);
  }
  @Cron('0 0 7 * * *')
  //@Get('/autoSendMail')
  async notifyViaMail() {
    const command = new NotifyViaMailCommand();
    await this.commandBus.execute(command);
  }

  @Get('/all')
  async getNotifications(@GetUser() user: User) {
    const query = new GetNotificationsQuery({
      uuid: user.uuid,
      tenantId: user.tenantId,
    });
    return await this.queryBus.execute(query);
  }
}
