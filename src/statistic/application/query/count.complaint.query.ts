import { IQuery } from '@nestjs/cqrs';

export class CountComplaintQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
