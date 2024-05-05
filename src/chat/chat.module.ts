import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendMessageToEmployeeHandler } from './application/command-handler/send.messageToEmployee.handler';
import { ListChatCustomerHandler } from './application/query-handler/list.chatCustomer.handler';
import { ListChatEmployeeHandler } from './application/query-handler/list.chatEmployee.handler';
import { ChatQuery } from './infrastructure/chat.query';
import { ChatRepository } from './infrastructure/chat.repository';
import { ChatController } from './presentation/chat.controller';

const application = [
  SendMessageToEmployeeHandler,
  ListChatCustomerHandler,
  ListChatEmployeeHandler,
];

const infrastructure = [ChatRepository, ChatQuery];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure],
  controllers: [ChatController],
})
export class ChatModule {}
