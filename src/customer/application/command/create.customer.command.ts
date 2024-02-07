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
  constructor(readonly data: Partial<CreateCustomerCommand>) {
    Object.assign(this, data);
  }
}
