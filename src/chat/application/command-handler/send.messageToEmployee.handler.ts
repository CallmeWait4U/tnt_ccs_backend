import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ChatRepository } from 'src/chat/infrastructure/chat.repository';
import { SendMessageToEmployeeCommand } from '../command/send.messageToEmployee.comand';

@CommandHandler(SendMessageToEmployeeCommand)
export class SendMessageToEmployeeHandler {
  @Inject()
  private readonly chatRepository: ChatRepository;
  async execute(command: SendMessageToEmployeeCommand) {
    // logic
    await this.chatRepository.CreateMessageToEmployee(
      command.senderUUID,
      command.receiverUUID,
      command.content,
    );
  }
}
