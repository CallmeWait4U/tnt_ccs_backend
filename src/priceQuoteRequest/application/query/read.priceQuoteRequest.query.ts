import { IQuery } from '@nestjs/cqrs';

export class ReadPriceQuoteRequestQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
