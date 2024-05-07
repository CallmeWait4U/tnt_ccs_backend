import { IQuery } from '@nestjs/cqrs';

export class ListProductOptionsQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
