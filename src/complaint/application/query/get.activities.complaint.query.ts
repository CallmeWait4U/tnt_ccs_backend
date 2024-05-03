import { IQuery } from '@nestjs/cqrs';

export class GetActivitiesComplaintQuery implements IQuery {
  constructor(
    readonly tenantId: string,
    readonly complaintUUID: string,
  ) {}
}
