import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { CreateNotificationCommand } from '../application/command/create.notification.command';
import { NotifyViaMailCommand } from '../application/command/notify.via.mail.command';
import { CreateNotificationDTO } from './dto/create.notification.dto';
import { NotificationGateway } from './notification.gateway';

@ApiTags('notifications')
@Controller('notifications')
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

  @Cron('0 0 7 * * *')
  //@Get('/autoSendMail')
  async notifyViaMail() {
    const command = new NotifyViaMailCommand();
    await this.commandBus.execute(command);
  }

  @Get('/all')
  async getNotifications() {}
}
