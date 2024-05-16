import { IQuery } from '@nestjs/cqrs';

export class GetBillByCustomerQuery implements IQuery {
  constructor(
    readonly customerUUID: string,
    readonly tenantId: string,
  ) {}
}
