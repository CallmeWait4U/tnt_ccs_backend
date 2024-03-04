import { ICommand } from '@nestjs/cqrs';
import { Gender } from '@prisma/client';

export class UpdateProductCommand implements ICommand {
  uuid: string;
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

  constructor(data: Partial<UpdateProductCommand>) {
    Object.assign(this, data);
  }
}
