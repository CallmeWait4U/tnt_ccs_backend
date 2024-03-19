import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RedisModule } from 'libs/redis.module';
import { NotificationController } from './presentation/notification.controller';
import { NotificationGateway } from './presentation/notification.gateway';

const application = [];

const infrastructure = [];

const domain = [];

@Module({
  imports: [CqrsModule, RedisModule],
  providers: [
    NotificationGateway,
    ...application,
    ...infrastructure,
    ...domain,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
