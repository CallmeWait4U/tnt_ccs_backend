import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class TaskForEmployee {
  @Expose()
  uuid: string;

  @Expose()
  createdDate: Date;

  @Expose()
  customerName: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;
}

export class GetHomePageForEmployeeResult implements IQueryResult {
  @Expose()
  numCustomers: number;

  @Expose()
  numPriceQuotes: number;

  @Expose()
  numComplaints: number;

  @Expose()
  listTask: TaskForEmployee[];

  @Expose()
  totalTask: number;
}
