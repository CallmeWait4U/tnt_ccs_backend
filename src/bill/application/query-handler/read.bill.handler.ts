import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BillQuery } from 'src/bill/infrastructure/bill.query';
import { ReadBillQuery } from '../query/read.bill.query';
import { ReadBillResult } from '../query/result/read.bill.query.result';

@QueryHandler(ReadBillQuery)
export class ReadBillHandler
  implements IQueryHandler<ReadBillQuery, ReadBillResult>
{
  constructor(private readonly billQuery: BillQuery) {}

  async execute(query: ReadBillQuery): Promise<ReadBillResult> {
    if (!query?.searchModel || query?.searchModel === '{}') {
      return await this.billQuery.readBill(query.uuid);
    }
    return await this.billQuery.readBill(query.uuid, query.searchModel);
  }
}
