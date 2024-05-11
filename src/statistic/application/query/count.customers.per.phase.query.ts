import { IQuery } from '@nestjs/cqrs';

export class CountCustomersPerPhaseQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
