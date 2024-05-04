import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';

export class ChatRepository {
  @Inject()
  private readonly prisma: PrismaService;
  async CreateMessageToEmployee(
    senderUUID: string,
    receiverUUID: string,
    content: string,
  ) {
    return await this.prisma.chatToEmployee.create({
      data: {
        senderUUID,
        receiverUUID,
        content,
      },
    });
  }
}
