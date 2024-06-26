import { ICommand } from '@nestjs/cqrs';
import { StatusPriceQuoteRequest } from '@prisma/client';
class ProductItem {
  uuid: string;
  quantity: number;
}
export class CreatePriceQuoteRequestCommand implements ICommand {
  code: string;
  createdDate: Date;
  status: StatusPriceQuoteRequest;
  sentDate: Date;
  accountCustomerUUID: string;
  products: ProductItem[];
  tenantId: string;

  constructor(data: Partial<CreatePriceQuoteRequestCommand>) {
    Object.assign(this, data);
  }
}
