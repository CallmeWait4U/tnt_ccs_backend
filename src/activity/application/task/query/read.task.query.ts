import { IQuery } from '@nestjs/cqrs';

export class ReadTaskQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
