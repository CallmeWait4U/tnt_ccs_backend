import { Gender, StatusCustomerAccount } from '@prisma/client';
import { Expose } from 'class-transformer';

export class BusinessType {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  businessNationality: string;
  @Expose()
  registrationNumber: string;
  @Expose()
  taxCode: string;
  @Expose()
  industry: string;
  @Expose()
  representativeName: string;
  @Expose()
  representativeDayOfBirth: Date;
  @Expose()
  representativeCccd: string;
  @Expose()
  representativePosition: string;
  @Expose()
  representativeGender: Gender;
  @Expose()
  representativePhone: string;
  @Expose()
  representativeEmail: string;
  @Expose()
  representativeNationality: string;
}

export class IndividualType {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  dayOfBirth: Date;
  @Expose()
  cccd: string;
  @Expose()
  gender: Gender;
  @Expose()
  email: string;
  @Expose()
  phoneNumber: string;
  @Expose()
  nationality: string;
}

export class CustomerModel {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  code: string;
  @Expose()
  isBusiness: boolean;
  @Expose()
  source: number;
  @Expose()
  city: number;
  @Expose()
  district: string;
  @Expose()
  detailAddress: string;
  @Expose()
  description: string;
  @Expose()
  receiveMail: boolean;
  @Expose()
  createdDate: Date;
  @Expose()
  hasAccount: StatusCustomerAccount;
  @Expose()
  phaseUUID: string;
  @Expose()
  tenantId: string;
  @Expose()
  business: BusinessType;
  @Expose()
  individual: IndividualType;
}
