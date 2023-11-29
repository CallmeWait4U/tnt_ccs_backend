import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindAllItem {
  @Expose()
  id: string;
}

export class FindAllResult implements IQueryResult {
  @Expose()
  items: FindAllItem[];

  @Expose()
  total: number;
}
