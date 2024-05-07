import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetInfoUserHandler } from './application/query-handler/get.info.user.handler';
import { UserQuery } from './infrastructure/user.query';
import { UserController } from './presentation/user.controller';

const application = [GetInfoUserHandler];

const infrastructure = [UserQuery];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [UserController],
})
export class UserModule {}
