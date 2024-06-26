import { ICommand } from '@nestjs/cqrs';
import { StatusPriceQuote } from '@prisma/client';
class ProductItem {
  uuid: string;
  quantity: number;
  negotiatedPrice: number;
}
export class CreatePriceQuoteCommand implements ICommand {
  code: string;
  createdDate: Date;
  status: StatusPriceQuote;
  sentDate: Date;
  customerUUID: string;
  priceQuoteRequestUUID: string;
  tenantId: string;
  accountUUID: string;
  effectiveDate: Date;
  products: ProductItem[];

  constructor(data: Partial<CreatePriceQuoteCommand>) {
    Object.assign(this, data);
  }
}
