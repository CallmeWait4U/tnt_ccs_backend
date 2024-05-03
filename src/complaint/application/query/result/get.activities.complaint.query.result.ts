import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetActivitiesComplaintItem implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  employeeCode: string;

  @Expose()
  employeeName: string;

  @Expose()
  doneDate: Date;

  @Expose()
  activityName: string;

  @Expose()
  note: string;
}

export class GetActivitiesComplaintResult implements IQueryResult {
  @Expose()
  items: GetActivitiesComplaintItem[];
}
