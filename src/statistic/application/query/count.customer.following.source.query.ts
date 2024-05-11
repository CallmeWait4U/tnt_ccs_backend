import { IQuery } from '@nestjs/cqrs';

export class CountCustomerFollowingSourceQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
