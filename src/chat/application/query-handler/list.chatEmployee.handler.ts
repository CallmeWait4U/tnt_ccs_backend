import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChatQuery } from 'src/chat/infrastructure/chat.query';
import { ListChatEmployeeQuery } from '../query/list.chatEmployee.query';
import { ListChatEmployeeResult } from '../query/result/list.chatEmployee.result';

@QueryHandler(ListChatEmployeeQuery)
export class ListChatEmployeeHandler
  implements IQueryHandler<ListChatEmployeeQuery, ListChatEmployeeResult>
{
  constructor(private readonly chatQuery: ChatQuery) {}

  async execute(query: ListChatEmployeeQuery) {
    return await this.chatQuery.listChatEmployee(
      query.tenantId,
      query.accountUUID,
      query.receiverUUID,
      query.limit,
    );
  }
}
