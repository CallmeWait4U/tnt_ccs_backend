import { ICommand } from '@nestjs/cqrs';
import { Gender } from '@prisma/client';

export class UpdateCustomerCommand implements ICommand {
  uuid: string;
  source: number;
  city: number;
  district: string;
  detailAddress: string;
  receiveMail: boolean;
  description: string;
  hasAccount: boolean;
  name: string;
  // Business
  businessNationality: string;
  registrationNumber: string;
  taxCode: string;
  industry: string;
  representativeName: string;
  representativeDayOfBirth: Date;
  representativeCccd: string;
  representativePosition: string;
  representativeGender: Gender;
  representativePhone: string;
  representativeEmail: string;
  representativeNationality: string;
  //Individual
  dayOfBirth: Date;
  cccd: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  nationality: string;
  constructor(readonly data: Partial<UpdateCustomerCommand>) {
    Object.assign(this, data);
  }
}
