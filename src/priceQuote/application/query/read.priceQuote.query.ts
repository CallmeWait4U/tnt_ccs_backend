import { IQuery } from '@nestjs/cqrs';

export class ReadPriceQuoteQuery implements IQuery {
  constructor(
    readonly uuid: string,
    readonly tenantId: string,
    readonly customerUUID?: string,
  ) {}
}
