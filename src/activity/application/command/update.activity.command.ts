import { ICommand } from '@nestjs/cqrs';

export class UpdateActivityCommand implements ICommand {
  uuid: string;
  code: string;
  name: string;
  city: number;
  district: string;
  detailAddress: string;
  email: string;
  phoneNumber: string;
  description: string;
  receiveMail: string;
  gender: boolean;
  position: string;
  avatar: Buffer; // Thêm thuộc tính avatar với kiểu Buffer
  nationality: string;
  constructor(readonly data: Partial<UpdateActivityCommand>) {
    Object.assign(this, data);
  }
}
