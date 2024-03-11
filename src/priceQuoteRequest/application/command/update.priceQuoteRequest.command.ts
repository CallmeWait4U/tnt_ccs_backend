import { ICommand } from '@nestjs/cqrs';
import { StatusPriceQuoteRequest } from '@prisma/client';

class ProductItem {
  uuid: string;
  quantity: number;
}
export class UpdatePriceQuoteRequestCommand implements ICommand {
  uuid: string;
  code: string;
  createdDate: Date;
  status: StatusPriceQuoteRequest;
  sentDate: Date;
  customerUUID: string;
  products: ProductItem[];

  constructor(data: Partial<UpdatePriceQuoteRequestCommand>) {
    Object.assign(this, data);
  }
}
