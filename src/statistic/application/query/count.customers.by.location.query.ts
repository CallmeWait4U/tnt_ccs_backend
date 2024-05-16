import { IQuery } from '@nestjs/cqrs';

export class CountCustomersByLocationQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
