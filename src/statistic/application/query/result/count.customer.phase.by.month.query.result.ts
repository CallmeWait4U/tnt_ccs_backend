import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class CountCustomerPhaseItem {
  @Expose()
  phaseUUID: string;

  @Expose()
  phaseName: string;

  @Expose()
  numCustomers: number;
}

export class CountCustomerPhaseByMonthItem {
  @Expose()
  listPhase: CountCustomerPhaseItem[];

  @Expose()
  time: number;
}

export class CountCustomerPhaseByMonthResult implements IQueryResult {
  @Expose()
  items: CountCustomerPhaseByMonthItem[];

  @Expose()
  total: number;
}
