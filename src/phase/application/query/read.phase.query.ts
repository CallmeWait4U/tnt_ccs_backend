import { IQuery } from '@nestjs/cqrs';

export class ReadPhaseQuery implements IQuery {
  constructor(readonly uuid: string) {}
}
