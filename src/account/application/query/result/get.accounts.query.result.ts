import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class AccountCustomerItem {
  // Mã kh, tên kh, loại kh, email, sdt, giai doan
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  isBusiness: boolean;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  phaseName: string;
}

export class AccountEmployeeItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  gender: string;

  @Expose()
  position: string;

  @Expose()
  dayOfBirth: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;
}

export class GetAccountsResult implements IQueryResult {
  @Expose()
  items: AccountCustomerItem[] | AccountEmployeeItem[];

  @Expose()
  total: number;
}
