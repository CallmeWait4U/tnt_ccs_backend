import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChatQuery } from 'src/chat/infrastructure/chat.query';
import { ListChatCustomerQuery } from '../query/list.chatCustomer.query';
import { ListChatCustomerResult } from '../query/result/list.chatCustomer.result';

@QueryHandler(ListChatCustomerQuery)
export class ListChatCustomerHandler
  implements IQueryHandler<ListChatCustomerQuery, ListChatCustomerResult>
{
  constructor(private readonly chatQuery: ChatQuery) {}

  async execute(query: ListChatCustomerQuery) {
    return await this.chatQuery.listChatCustomer(
      query.tenantId,
      query.customerUUID,
      query.isCustomer,
      query.limit,
    );
  }
}
