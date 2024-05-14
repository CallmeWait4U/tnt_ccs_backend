import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { NotificationModel } from '../domain/notification.model';
import { NotificationFactory } from './notification.factory';

export class NotificationRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly notificationFactory: NotificationFactory;

  async createNotifications(
    notifications: NotificationModel[],
  ): Promise<string[]> {
    const data = [];
    notifications.forEach(async (notification) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, accountUUID, ...dataNotification } = notification;
      data.push({
        ...dataNotification,
        account: { connect: { uuid: accountUUID } },
      });
      await this.prisma.notification.create({
        data: {
          ...dataNotification,
          account: { connect: { uuid: accountUUID } },
        },
      });
    });
    return notifications.map((i) => i.uuid);
  }
}
