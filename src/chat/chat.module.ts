import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from 'libs/email.module';
import { RedisModule } from 'libs/redis.module';
import { NotifyViaMailHandler } from './application/command-handler/notify.via.mail.handler';
import { NotificationDomain } from './domain/chat.domain';
import { NotificationQuery } from './infrastructure/chat.query';
import { NotificationController } from './presentation/chat.controller';
import { chatGateway } from './presentation/chat.gateway';

const application = [NotifyViaMailHandler];

const infrastructure = [NotificationQuery];

const domain = [NotificationDomain];

@Module({
  imports: [ScheduleModule.forRoot(), EmailModule, CqrsModule, RedisModule],
  providers: [chatGateway, ...application, ...infrastructure, ...domain],
  controllers: [NotificationController],
})
export class NotificationModule {}
