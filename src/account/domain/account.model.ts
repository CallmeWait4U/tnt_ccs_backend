import { Gender, TypeAccount } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CustomerType {
  @Expose()
  uuid: string;
  @Expose()
  code: string;
  @Expose()
  isBusiness: boolean;
  @Expose()
  receiveMail: boolean;
  @Expose()
  business: {
    name: string;
    representativeEmail: string;
  };
  @Expose()
  individual: {
    name: string;
    email: string;
  };
}

export class EmployeeType {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  name: string;
  @Expose()
  code: string;
  @Expose()
  dayOfBirth: Date;
  @Expose()
  city: string;
  @Expose()
  district: string;
  @Expose()
  detailAddress: string;
  @Expose()
  email: string;
  @Expose()
  phoneNumber: string;
  @Expose()
  description: string;
  @Expose()
  gender: Gender;
  @Expose()
  position: string;
  @Expose()
  nationality: string;
  @Expose()
  tenantId: string;
}

export class AccountModel {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  username: string;
  @Expose()
  password: string;
  @Expose()
  refreshToken: string;
  @Expose()
  accessToken: string;
  @Expose()
  type: TypeAccount;
  @Expose()
  tenantId: string;
  @Expose()
  customer: CustomerType;
  @Expose()
  customerUUID: string;
  @Expose()
  employee: EmployeeType;
  @Expose()
  employeeUUID: string;
}
