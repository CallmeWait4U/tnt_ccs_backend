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
    return await this.prisma.chat.create({
      data: {
        sender: { connect: { uuid: senderUUID } },
        receiver: { connect: { uuid: receiverUUID } },
        content,
      },
    });
  }
}
