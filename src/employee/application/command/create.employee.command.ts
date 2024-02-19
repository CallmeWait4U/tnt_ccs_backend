import { ICommand } from '@nestjs/cqrs';

export class CreateEmployeeCommand implements ICommand {
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
  constructor(readonly data: Partial<CreateEmployeeCommand>) {
    Object.assign(this, data);
  }
}
