import { ICommand } from '@nestjs/cqrs';
import { StatusPriceQuote } from '@prisma/client';

class ProductItem {
  uuid: string;
  quantity: number;
  negotiatedPrice: number;
}
export class UpdatePriceQuoteCommand implements ICommand {
  uuid: string;
  code: string;
  createdDate: Date;
  status: StatusPriceQuote;
  sentDate: Date;
  customerUUID: string;
  products: ProductItem[];

  constructor(data: Partial<UpdatePriceQuoteCommand>) {
    Object.assign(this, data);
  }
}
