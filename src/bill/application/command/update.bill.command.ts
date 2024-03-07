import { ICommand } from '@nestjs/cqrs';
import { StatusBill } from '@prisma/client';

class ProductItem {
  uuid: string;
  quantity: number;
  fixedPrice: number;
}
export class UpdateBillCommand implements ICommand {
  uuid: string;
  code: string;
  createdDate: Date;
  status: StatusBill;
  customerUUID: string;
  products: ProductItem[];

  constructor(data: Partial<UpdateBillCommand>) {
    Object.assign(this, data);
  }
}
