import { IQuery } from '@nestjs/cqrs';

export class ReadTypeComplaintQuery implements IQuery {
  constructor(
    readonly uuid: string,
    readonly tenantId: string,
  ) {}
}
