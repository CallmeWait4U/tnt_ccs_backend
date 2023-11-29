import { ICommand } from '@nestjs/cqrs';

export class CreateCompanyCommand implements ICommand {
  name: string;
  taxCode: string;
  businessRegistrationNumber: string;
  businessNationality: string;
  businessIndustryId: string;
  phoneNumber: string;
  email: string;
  address: string;
  domain: string;

  constructor(readonly data: Partial<CreateCompanyCommand>) {
    Object.assign(this, data);
  }
}
