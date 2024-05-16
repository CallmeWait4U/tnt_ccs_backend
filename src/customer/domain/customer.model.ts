import { Gender, StatusCustomerAccount } from '@prisma/client';
import { Expose } from 'class-transformer';

export class BusinessType {
  @Expose()
  id: number;
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

export class PhasesCustomerType {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  date: Date;
  @Expose()
  phaseUUID: string;
  @Expose()
  customerUUID: string;
}

export class CustomerModel {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  name: string;
  @Expose()
  code: string;
  @Expose()
  isBusiness: boolean;
  @Expose()
  source: number;
  @Expose()
  city: string;
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
  phasesCustomer: PhasesCustomerType[];
  @Expose()
  tenantId: string;
  @Expose()
  business: BusinessType;
  @Expose()
  individual: IndividualType;
  @Expose()
  employees: {
    uuid: string;
  }[];
}
