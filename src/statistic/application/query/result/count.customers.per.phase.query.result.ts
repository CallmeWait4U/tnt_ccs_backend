import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class CountCustomersPerPhaseItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  numCustomers: number;

  @Expose()
  isIncreased: boolean;

  @Expose()
  ratioPreviousMonth: number;
}

export class CountCustomersPerPhaseResult implements IQueryResult {
  @Expose()
  items: CountCustomersPerPhaseItem[];
  @Expose()
  total: number;
}
