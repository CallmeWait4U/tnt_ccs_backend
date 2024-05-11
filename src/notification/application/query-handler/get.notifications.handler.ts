import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationQuery } from 'src/notification/infrastructure/notification.query';
import { GetNotificationsQuery } from '../query/get.notifications.query';
import { GetNotificationsResult } from '../query/result/get.notifications.query.result';

@QueryHandler(GetNotificationsQuery)
export class GetNotificationHandler
  implements IQueryHandler<GetNotificationsQuery, GetNotificationsResult>
{
  @Inject()
  private readonly notitficationQuery: NotificationQuery;

  async execute(query: GetNotificationsQuery): Promise<GetNotificationsResult> {
    return await this.notitficationQuery.getNotification(
      query.uuid,
      query.tenantId,
    );
  }
}
