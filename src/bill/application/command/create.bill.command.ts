import { ICommand } from '@nestjs/cqrs';
import { StatusBill } from '@prisma/client';
class ProductItem {
  uuid: string;
  quantity: number;
  fixedPrice: number;
}
export class CreateBillCommand implements ICommand {
  code: string;
  createdDate: Date;
  status: StatusBill;
  sentDate: Date;
  customerUUID: string;
  priceQuoteUUID: string;
  tenantId: string;
  products: ProductItem[];

  constructor(data: Partial<CreateBillCommand>) {
    Object.assign(this, data);
  }
}
