import { IQuery } from '@nestjs/cqrs';

export class GetNotificationsQuery implements IQuery {
  uuid: string;
  tenantId: string;

  constructor(data: Partial<GetNotificationsQuery>) {
    Object.assign(this, data);
  }
}
