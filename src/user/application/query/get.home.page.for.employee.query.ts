import { IQuery } from '@nestjs/cqrs';

export class GetHomePageForEmployeeQuery implements IQuery {
  uuid: string;
  tenantId: string;
  offset: number;
  limit: number;
  searchModel?: any;

  constructor(data: Partial<GetHomePageForEmployeeQuery>) {
    Object.assign(this, data);
  }
}
