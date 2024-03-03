import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class ReadPhaseResult implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  priority: number;

  @Expose()
  description: string;
}
