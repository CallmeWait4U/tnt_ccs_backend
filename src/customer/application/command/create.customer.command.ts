import { ICommand } from '@nestjs/cqrs';
import { Gender, StatusCustomerAccount } from '@prisma/client';

export class CreateCustomerCommand implements ICommand {
  isBusiness: boolean;
  code: string;
  source: number;
  city: string;
  district: string;
  detailAddress: string;
  description: string;
  createdDate: Date;
  hasAccount: StatusCustomerAccount;
  name: string;
  phaseUUID: string;
  employeeUUIDs: string[];
  tenantId: string;
  // Business
  businessNationality?: string;
  registrationNumber?: string;
  taxCode?: string;
  industry?: string;
  representativeName?: string;
  representativeDayOfBirth?: Date;
  representativeCccd?: string;
  representativePosition?: string;
  representativeGender?: Gender;
  representativePhone?: string;
  representativeEmail?: string;
  representativeNationality?: string;
  //Individual
  dayOfBirth?: Date;
  cccd?: string;
  gender?: Gender;
  email?: string;
  phoneNumber?: string;
  nationality?: string;

  constructor(data: Partial<CreateCustomerCommand>) {
    Object.assign(this, data);
  }
}
