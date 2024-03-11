import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class PhaseItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  priority: number;

  @Expose()
  description: string;

  @Expose()
  customersNumber: number;
}

export class GetPhasesResult implements IQueryResult {
  @Expose()
  items: PhaseItem[];

  @Expose()
  total: number;
}
