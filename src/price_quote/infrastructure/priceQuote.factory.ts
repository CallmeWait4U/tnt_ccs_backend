import { PriceQuote, Prisma } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import {
  CustomerType,
  EmployeeType,
  PriceQuoteModel,
} from '../domain/priceQuote.model';

type PriceQuoteEntity = Prisma.PriceQuoteGetPayload<{
  include: {
    customer: true;
    employee: true;
  };
}>;

export class PriceQuoteFactory extends BaseFactory {
  createPriceQuoteModel(
    priceQuote: PriceQuoteEntity | PriceQuote | Partial<PriceQuote> | null,
  ) {
    if (!priceQuote) return null;
    let customer = {};
    let employee = {};
    if (priceQuote.type === 'CUSTOMER') {
      customer = this.createModel(CustomerType, { ...priceQuote });
    } else {
      employee = this.createModel(EmployeeType, { ...priceQuote });
    }
    return this.createModel(PriceQuoteModel, {
      ...priceQuote,
      customer: 'customer' in priceQuote ? priceQuote.customer : customer,
      employee: 'employee' in priceQuote ? priceQuote.employee : employee,
    });
  }

  createPriceQuoteModels(
    priceQuotes:
      | PriceQuoteEntity[]
      | PriceQuote[]
      | Partial<PriceQuote>[]
      | null,
  ) {
    if (!priceQuotes) return null;
    return priceQuotes.map((priceQuote) =>
      this.createPriceQuoteModel(priceQuote),
    );
  }
}
