import { IQuery } from '@nestjs/cqrs';

export class GetInfoUserQuery implements IQuery {
  uuid: string;
  tenantId: string;

  constructor(data: Partial<GetInfoUserQuery>) {
    Object.assign(this, data);
  }
}
