import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetNotificationsItem implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  time: Date;
}

export class GetNotificationsResult implements IQueryResult {
  @Expose()
  items: GetNotificationsItem[];

  @Expose()
  total: number;
}
