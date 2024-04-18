import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetSelectorTypeItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;
}

export class GetSelectorTypeResult implements IQueryResult {
  @Expose()
  item: GetSelectorTypeItem[];
}
