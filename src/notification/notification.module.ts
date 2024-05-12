import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from 'libs/email.module';
import { RedisModule } from 'libs/redis.module';
import { CreateNotificationHandler } from './application/command-handler/create.notification.handler';
import { NotifyViaMailHandler } from './application/command-handler/notify.via.mail.handler';
import { GetNotificationHandler } from './application/query-handler/get.notifications.handler';
import { NotificationDomain } from './domain/notification.domain';
import { NotificationFactory } from './infrastructure/notification.factory';
import { NotificationQuery } from './infrastructure/notification.query';
import { NotificationRepository } from './infrastructure/notification.repository';
import { NotificationController } from './presentation/notification.controller';
import { NotificationGateway } from './presentation/notification.gateway';
// import { NotificationGateway } from './presentation/notification.gateway';

const application = [
  NotifyViaMailHandler,
  CreateNotificationHandler,
  GetNotificationHandler,
];

const infrastructure = [
  NotificationQuery,
  NotificationFactory,
  NotificationRepository,
];

const domain = [NotificationDomain];

@Module({
  imports: [ScheduleModule.forRoot(), EmailModule, CqrsModule, RedisModule],
  providers: [
    NotificationGateway,
    ...application,
    ...infrastructure,
    ...domain,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
