import { IQuery } from '@nestjs/cqrs';

export class SelectorComplaintByCustomerQuery implements IQuery {
  constructor(
    readonly customerUUID: string,
    readonly tenantId: string,
  ) {}
}
