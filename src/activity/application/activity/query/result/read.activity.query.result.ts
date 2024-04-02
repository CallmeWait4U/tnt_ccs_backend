import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class ReadActivityResult implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  phaseName: string[];
}
