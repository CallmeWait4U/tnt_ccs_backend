import { Notification } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { NotificationModel } from '../domain/notification.model';

export class NotificationFactory extends BaseFactory {
  createNotificationModel(
    notification: Partial<Notification> | Partial<NotificationModel> | null,
  ) {
    if (!notification) return null;
    return this.createModel(NotificationModel, notification);
  }

  createNotificationModels(
    notifications:
      | Partial<Notification>[]
      | Partial<NotificationModel>[]
      | null,
  ) {
    if (!notifications) return null;
    return notifications.map((notification) =>
      this.createNotificationModel(notification),
    );
  }
}
