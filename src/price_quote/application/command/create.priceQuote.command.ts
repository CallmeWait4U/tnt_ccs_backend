import { ICommand } from '@nestjs/cqrs';
import { Gender, TypePriceQuote } from '@prisma/client';

export class CreatePriceQuoteCommand implements ICommand {
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
  type: TypePriceQuote;

  constructor(data: Partial<CreatePriceQuoteCommand>) {
    Object.assign(this, data);
  }
}
