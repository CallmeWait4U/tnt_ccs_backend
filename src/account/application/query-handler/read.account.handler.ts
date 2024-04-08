import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountQuery } from 'src/account/infrastructure/account.query';
import { ReadAccountQuery } from '../query/read.account.query';
import { ReadAccountResult } from '../query/result/read.account.query.result';

@QueryHandler(ReadAccountQuery)
export class ReadAccountHandler
  implements IQueryHandler<ReadAccountQuery, ReadAccountResult>
{
  constructor(private readonly accountQuery: AccountQuery) {}

  async execute(query: ReadAccountQuery): Promise<ReadAccountResult> {
    return await this.accountQuery.readAccount(query.uuid, query.tenantId);
  }
}
