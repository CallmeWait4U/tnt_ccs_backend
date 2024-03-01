import { IQuery } from '@nestjs/cqrs';

export class ReadCustomerQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
