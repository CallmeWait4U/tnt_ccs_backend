import { IQueryResult } from '@nestjs/cqrs';
import { StatusComplaint } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CountStatusComplaint {
  @Expose()
  numComplaint: number;

  @Expose()
  status: StatusComplaint;
}

export class CountComplaintItem {
  @Expose()
  classification: CountStatusComplaint[];

  @Expose()
  typeComplaintName: string;
}

export class CountComplaintResult implements IQueryResult {
  @Expose()
  items: CountComplaintItem[];

  @Expose()
  total: number;
}
