import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotificationDomain } from 'src/notification/domain/notification.domain';
import { NotificationModel } from 'src/notification/domain/notification.model';
import { NotificationFactory } from 'src/notification/infrastructure/notification.factory';
import { NotificationRepository } from 'src/notification/infrastructure/notification.repository';
import { CreateNotificationCommand } from '../command/create.notification.command';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationHandler
  implements ICommandHandler<CreateNotificationCommand, string[]>
{
  @Inject()
  private readonly notificationDomain: NotificationDomain;
  @Inject()
  private readonly noticationRepository: NotificationRepository;
  @Inject()
  private readonly notificationFactory: NotificationFactory;

  async execute(command: CreateNotificationCommand): Promise<string[]> {
    const notifications: NotificationModel[] = [];
    for (const accountUUID of command.accountUUIDs) {
      const model = this.notificationFactory.createNotificationModel({
        ...command,
        accountUUID,
      });
      notifications.push(
        this.notificationDomain.createNotificationComplaint(model),
      );
    }
    return await this.noticationRepository.createNotifications(notifications);
  }
}
