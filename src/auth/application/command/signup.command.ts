import { ICommand } from '@nestjs/cqrs';

export class SignUpCommand implements ICommand {
  tenantName: string;
  taxCode: string;
  businessRegistrationNumber: string;
  businessNationality: string;
  businessIndustry: string;
  phoneNumber: string;
  email: string;
  addressDetail: string;
  district: string;
  city: string;
  country: string;
  domain: string;
  name: string;
  dayOfBirth: Date;
  cccd: string;
  username: string;
  password: string;
  passwordConfirm: string;

  constructor(readonly data: Partial<SignUpCommand>) {
    Object.assign(this, data);
  }
}
