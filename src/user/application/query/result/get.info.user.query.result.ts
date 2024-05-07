import { IQueryResult } from '@nestjs/cqrs';
import { Gender } from '@prisma/client';
import { Expose } from 'class-transformer';

export class GetInfoUserBusinessResult implements IQueryResult {
  @Expose()
  type: string;

  @Expose()
  phaseName: string;

  @Expose()
  code: string;

  @Expose()
  source: string;

  @Expose()
  receiveMail: boolean;

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
}

export class GetInfoUserIndividualResult implements IQueryResult {
  @Expose()
  type: string;

  @Expose()
  phaseName: string;

  @Expose()
  code: string;

  @Expose()
  source: string;

  @Expose()
  receiveMail: boolean;

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
}

export class GetInfoUserEmployeeResult implements IQueryResult {
  @Expose()
  uuid: string; // EmployeeUUID

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  position: string;

  @Expose()
  dayOfBirth: Date;

  @Expose()
  gender: Gender;

  @Expose()
  nationality: string;

  @Expose()
  cccd: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email: string;

  @Expose()
  description: string;

  @Expose()
  city: string;

  @Expose()
  district: string;

  @Expose()
  detailAddress: string;
}
