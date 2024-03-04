import { ICommand } from '@nestjs/cqrs';
import { Gender } from '@prisma/client';

export class CreateProductCommand implements ICommand {
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
  constructor(data: Partial<CreateProductCommand>) {
    Object.assign(this, data);
  }
}
