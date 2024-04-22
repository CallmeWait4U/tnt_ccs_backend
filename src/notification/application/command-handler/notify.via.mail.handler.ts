import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailService } from 'libs/email.module';
import { NotificationDomain } from 'src/notification/domain/notification.domain';
import { NotificationQuery } from 'src/notification/infrastructure/notification.query';
import { NotifyViaMailCommand } from '../command/notify.via.mail.command';

@CommandHandler(NotifyViaMailCommand)
export class NotifyViaMailHandler
  implements ICommandHandler<NotifyViaMailCommand, void>
{
  @Inject()
  private readonly notificationQuery: NotificationQuery;
  @Inject()
  private readonly notificationDomain: NotificationDomain;
  @Inject()
  private readonly emailService: EmailService;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(command: NotifyViaMailCommand): Promise<void> {
    const { customers, tenants } =
      await this.notificationQuery.getTasksByCustomer();
    const { employees } = await this.notificationQuery.getTasksByEmployee();
    const autoMail = this.notificationDomain.handlerAutoNotifyTask(
      customers,
      employees,
      tenants,
    );
    autoMail.forEach((i) => this.emailService.sendAutoEmail(i));
  }
}
