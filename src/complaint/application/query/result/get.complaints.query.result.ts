import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class ComplaintItem {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  customerName: string;

  @Expose()
  customerCode: string;

  @Expose()
  typeComplaintName: string;

  @Expose()
  sentDate: string;

  @Expose()
  employeeName: string[];

  @Expose()
  status: string;
}

export class GetComplaintsResult implements IQueryResult {
  @Expose()
  items: ComplaintItem[];

  @Expose()
  total: number;
}
