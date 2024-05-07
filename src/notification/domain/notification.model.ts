import { Expose } from 'class-transformer';

export class NotificationModel {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  type: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  time: Date;

  @Expose()
  accountUUID: string;

  @Expose()
  tenantId: string;
}
