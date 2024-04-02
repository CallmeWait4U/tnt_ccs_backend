import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BillQuery } from 'src/bill/infrastructure/bill.query';
import { GetBillsQuery } from '../query/list.bill.query';
import { GetBillsResult } from '../query/result/list.bill.query.result';

@QueryHandler(GetBillsQuery)
export class GetBillsHandler
  implements IQueryHandler<GetBillsQuery, GetBillsResult>
{
  constructor(private readonly billQuery: BillQuery) {}

  async execute(query: GetBillsQuery): Promise<GetBillsResult> {
    return await this.billQuery.getBills(
      query.offset,
      query.limit,
      query.searchModel,
    );
  }
}
