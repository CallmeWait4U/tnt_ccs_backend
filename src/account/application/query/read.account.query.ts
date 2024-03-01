import { IQuery } from '@nestjs/cqrs';

export class ReadAccountQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
