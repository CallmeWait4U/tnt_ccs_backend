import { ICommand } from '@nestjs/cqrs';
import { Gender, TypeAccount } from '@prisma/client';

export class CreateAccountCommand implements ICommand {
  name: string;
  code: string;
  position: string;
  dayOfBirth: Date;
  gender: Gender;
  nationality: string;
  cccd: string;
  phoneNumber: string;
  email: string;
  city: number;
  district: string;
  detailAddress: string;
  description: string;
  type: TypeAccount;

  constructor(data: Partial<CreateAccountCommand>) {
    Object.assign(this, data);
  }
}
