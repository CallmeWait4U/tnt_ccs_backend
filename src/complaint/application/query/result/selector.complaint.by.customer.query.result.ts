import { IQueryResult } from '@nestjs/cqrs';
import { StatusComplaint } from '@prisma/client';
import { Expose } from 'class-transformer';

export class SelectorComplaintByCustomerItem {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  typeComplaintName: string;

  @Expose()
  sentDate: string;

  @Expose()
  status: StatusComplaint;
}

export class SelectorComplaintByCustomerResult implements IQueryResult {
  @Expose()
  items: SelectorComplaintByCustomerItem[];

  @Expose()
  total: number;
}
