import { IQuery } from '@nestjs/cqrs';

export class GetSelectorTypeQuery implements IQuery {
  tenantId: string;

  constructor(data: Partial<GetSelectorTypeQuery>) {
    Object.assign(this, data);
  }
}
