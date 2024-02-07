import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { FindAllQuery } from '../query/find.all.query';
import { FindAllItem, FindAllResult } from '../query/result/find.all.result';

@QueryHandler(FindAllQuery)
export class FindAllHandler
  implements IQueryHandler<FindAllQuery, FindAllResult>
{
  // @Inject
  async execute(query: FindAllQuery): Promise<FindAllResult> {
    console.log(query);
    const data = [
      {
        id: '1',
        name: '1',
      },
      {
        id: '2',
        name: '2',
      },
      {
        id: '3',
        name: '3',
      },
    ];
    return {
      items: data.map((item) => plainToClass(FindAllItem, item)),
      total: data.length,
    };
  }
}
