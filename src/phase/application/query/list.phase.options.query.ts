import { IQuery } from '@nestjs/cqrs';

export class ListPhaseOptionsQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
