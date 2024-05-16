import { IQuery } from '@nestjs/cqrs';

export class GetSelectorByCustomerQuery implements IQuery {
  constructor(
    readonly customerUUID: string,
    readonly tenantId: string,
  ) {}
}
