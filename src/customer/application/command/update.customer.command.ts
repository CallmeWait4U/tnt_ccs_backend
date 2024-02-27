import { ICommand } from '@nestjs/cqrs';

export class UpdateCustomerCommand implements ICommand {
  uuid: string;
  code: string;
  name: string;
  source: number;
  city: number;
  district: string;
  detailAddress: string;
  email: string;
  receiveMail: string;
  phoneNumber: string;
  description: string;
  business: {
    name: string;
    nationality?: string;
    registrationNumber?: string;
    taxCode?: string;
    industryId?: string;
    representativeName?: string;
    representativeBirthday?: Date;
    representativeCccd?: string;
    representativePosition?: string;
    representativeGender?: number;
    representativePhone?: string;
    representativeEmail?: string;
  };
  individual: {
    name: string;
    birthday: Date;
    cccd: string;
    gender: number;
    nationality: string;
  };
  constructor(readonly data: Partial<UpdateCustomerCommand>) {
    Object.assign(this, data);
  }
}
