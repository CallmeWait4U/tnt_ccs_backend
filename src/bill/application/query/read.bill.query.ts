import { IQuery } from '@nestjs/cqrs';

export class ReadBillQuery implements IQuery {
  constructor(
    readonly uuid: string,
    readonly searchModel: string,
  ) {}
}
