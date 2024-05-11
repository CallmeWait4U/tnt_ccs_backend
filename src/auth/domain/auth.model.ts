import { Gender, Permission, TypeAccount } from '@prisma/client';
import { Expose } from 'class-transformer';

export class TenantModel {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  name: string;
  @Expose()
  taxCode: string;
  @Expose()
  businessRegistrationNumber: string;
  @Expose()
  businessNationality: string;
  @Expose()
  businessIndustry: string;
  @Expose()
  phoneNumber: string;
  @Expose()
  email: string;
  @Expose()
  addressDetail: string;
  @Expose()
  district: string;
  @Expose()
  city: string;
  @Expose()
  country: string;
  @Expose()
  domain: string;
  @Expose()
  createdDate: Date;
  @Expose()
  tenantId: string;
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
  permissions: Permission[];
  @Expose()
  employee: EmployeeType;
}
