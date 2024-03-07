import { IQuery } from '@nestjs/cqrs';

export class ReadProductQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
