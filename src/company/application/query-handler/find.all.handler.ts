import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllQuery } from '../query/find.all.query';
import { FindAllResult } from '../query/result/find.all.result';

@QueryHandler(FindAllQuery)
export class FindAllHandler
  implements IQueryHandler<FindAllQuery, FindAllResult>
{
  // @Inject
  async execute(query: FindAllQuery): Promise<FindAllResult> {
    console.log(query);
    return new FindAllResult();
  }
}
