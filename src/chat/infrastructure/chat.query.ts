import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  ChatCustomerResult,
  ListChatCustomerResult,
} from '../application/query/result/list.chatCustomer.result';
import {
  ChatEmployeeResult,
  ListChatEmployeeResult,
} from '../application/query/result/list.chatEmployee.result';

export class ChatQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async listChatEmployee(
    tenantId: string,
    accountUUID: string,
    receiverUUID: string,

    limit: number,
  ): Promise<ListChatEmployeeResult> {
    const data = await this.prisma.chat.findMany({
      where: {
        sender: {
          tenantId,
        },
        receiver: {
          tenantId,
        },
        OR: [
          {
            senderUUID: accountUUID,
            receiverUUID: receiverUUID,
          },
          {
            receiverUUID: accountUUID,
            senderUUID: receiverUUID,
          },
        ],
        receiverUUID,
      },
      orderBy: {
        createdAt: 'desc',
      },

      take: limit,
    });

    const items: ChatEmployeeResult[] = data.map((item) => {
      let isSender = false;
      if (item.senderUUID === accountUUID) {
        isSender = true;
      }

      return {
        isSender,
        content: item.content,
        createdAt: item.createdAt,
      };
    });
    const result: ListChatEmployeeResult = {
      items,
      total: items.length,
    };
    return result;
  }
  async listChatCustomer(
    tenantId: string,
    customerUUID: string,
    isCustomer: boolean,
    limit: number,
  ): Promise<ListChatCustomerResult> {
    const data = await this.prisma.chat.findMany({
      where: {
        sender: {
          tenantId,
        },
        receiver: {
          tenantId,
        },
        OR: [
          {
            senderUUID: customerUUID,
          },
          {
            receiverUUID: customerUUID,
          },
        ],
      },
      include: {
        sender: {
          select: {
            username: true,
          },
        },
        receiver: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    const items: ChatCustomerResult[] = data.map((item) => {
      let isSender = false;
      if (isCustomer) {
        if (item.senderUUID === customerUUID) {
          isSender = true;
        }
      } else {
        if (item.receiverUUID === customerUUID) {
          // sender is customer
          isSender = true;
        }
      }

      return {
        isSender,
        content: item.content,
        createdAt: item.createdAt,
        senderUsername: item?.sender?.username,
        receiverUsername: item?.receiver?.username,
      };
    });
    const result: ListChatCustomerResult = {
      items,
      total: items.length,
    };
    return result;
  }
}
