import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class SelectorEmployeeItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;
}

export class SelectorEmployeeResult implements IQueryResult {
  @Expose()
  items: SelectorEmployeeItem[];
}
