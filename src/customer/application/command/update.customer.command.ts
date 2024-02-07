import { ICommand } from '@nestjs/cqrs';

export class UpdateCustomerCommand implements ICommand {
  uuid: string;
  code: string;
  name: string;
  isBusiness: boolean;
  source: number;
  city: number;
  district: string;
  detailAddress: string;
  email: string;
  receiveMail: string;
  phoneNumber: string;
  description: string;
  constructor(readonly data: Partial<UpdateCustomerCommand>) {
    Object.assign(this, data);
  }
}
