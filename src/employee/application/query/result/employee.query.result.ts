import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class EmployeeItem {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  code: string | null;

  @Expose()
  name: string;

  @Expose()
  city: number | null;

  @Expose()
  district: string | null;

  @Expose()
  detailAddress: string | null;

  @Expose()
  email: string | null;

  @Expose()
  phoneNumber: string;

  @Expose()
  description: string | null;

  @Expose()
  gender: boolean;

  @Expose()
  position: string | null;

  @Expose()
  avatar: Buffer | null;

  @Expose()
  nationality: string | null;
}

export class ListEmployeeResult implements IQueryResult {
  @Expose()
  items: EmployeeItem[];

  @Expose()
  total: number;
}
