import { IQuery } from '@nestjs/cqrs';

export class ReadComplaintQuery implements IQuery {
  constructor(
    readonly uuid: string,
    readonly tenantId: string,
  ) {}
}
