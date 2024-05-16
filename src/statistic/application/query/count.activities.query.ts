import { IQuery } from '@nestjs/cqrs';

export class CountActivitiesQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
