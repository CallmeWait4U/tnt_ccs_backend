import { ICommand } from '@nestjs/cqrs';

export class CreateCustomerCommand implements ICommand {
  uuid: string;
  code: string;
  name: string;
  isBusiness: boolean;
  source: number;
  city: number;
  district: string;
  detailAddress: string;
  email: string;
  phoneNumber: string;
  description: string;
  receiveMail: string;
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
  constructor(readonly data: Partial<CreateCustomerCommand>) {
    Object.assign(this, data);
  }
}
