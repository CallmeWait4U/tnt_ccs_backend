import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

class Employee {
  @Expose()
  code: string;

  @Expose()
  name: string;
}

export class ReadBusinessResult implements IQueryResult {
  @Expose()
  type: string;

  @Expose()
  phaseName: string;

  @Expose()
  code: string;

  @Expose()
  source: string;

  @Expose()
  createdDate: Date;

  @Expose()
  hasAccount: boolean;

  @Expose()
  name: string;

  @Expose()
  taxCode: string;

  @Expose()
  registrationNumber: string;

  @Expose()
  nationality: string;

  @Expose()
  industry: string;

  @Expose()
  description: string;

  @Expose()
  detailAddress: string;

  @Expose()
  district: string;

  @Expose()
  city: number;

  @Expose()
  representativeName: string;

  @Expose()
  representativeGender: string;

  @Expose()
  representativeDayOfBirth: Date;

  @Expose()
  representativeCccd: string;

  @Expose()
  representativeNationality: string;

  @Expose()
  representativePosition: string;

  @Expose()
  representativePhone: string;

  @Expose()
  representativeEmail: string;

  @Expose()
  employees: Employee[];
}

export class ReadIndividualResult implements IQueryResult {
  @Expose()
  type: string;

  @Expose()
  phaseName: string;

  @Expose()
  code: string;

  @Expose()
  source: string;

  @Expose()
  createdDate: Date;

  @Expose()
  hasAccount: boolean;

  @Expose()
  name: string;

  @Expose()
  gender: string;

  @Expose()
  dayOfBirth: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email: string;

  @Expose()
  cccd: string;

  @Expose()
  nationality: string;

  @Expose()
  description: string;

  @Expose()
  detailAddress: string;

  @Expose()
  district: string;

  @Expose()
  city: number;

  @Expose()
  employees: Employee[];
}
