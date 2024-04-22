import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { NotifyViaMailCommand } from '../application/command/notify.via.mail.command';
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

  // @Cron('0 0 7 * * *')
  @Get('/autoSendMail')
  async notifyViaMail() {
    const command = new NotifyViaMailCommand();
    await this.commandBus.execute(command);
  }
}
