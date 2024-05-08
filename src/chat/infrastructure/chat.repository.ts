import { HttpException, Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';

export class ChatRepository {
  @Inject()
  private readonly prisma: PrismaService;
  async CreateMessageToEmployee(
    senderUUID: string,
    receiverUUID: string,
    content: string,
  ) {
    let receiverUUID1 = receiverUUID;
    if (receiverUUID !== senderUUID) {
      ///// emp to customer
      const customer = await this.prisma.account.findUnique({
        where: {
          customerUUID: receiverUUID,
        },
      });
      receiverUUID1 = customer?.uuid || undefined;
    }

    if (receiverUUID1)
      return await this.prisma.chat.create({
        data: {
          senderUUID,
          receiverUUID: receiverUUID1,
          content,
        },
      });
    throw new HttpException('Receiver not found', 404);
  }
}
