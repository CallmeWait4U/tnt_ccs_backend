import { IQuery } from '@nestjs/cqrs';

export class GetSelectorProductQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
