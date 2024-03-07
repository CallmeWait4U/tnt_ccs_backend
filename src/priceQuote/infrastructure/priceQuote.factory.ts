import { PriceQuote } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { PriceQuoteModel } from '../domain/priceQuote.model';

export class PriceQuoteFactory extends BaseFactory {
  createPriceQuoteModel(priceQuote: PriceQuote | Partial<PriceQuote> | null) {
    if (!priceQuote) return null;

    return this.createModel(PriceQuoteModel, {
      ...priceQuote,
    });
  }

  createPriceQuoteModels(
    priceQuotes: PriceQuote[] | Partial<PriceQuote>[] | null,
  ) {
    if (!priceQuotes) return null;
    return priceQuotes.map((priceQuote) =>
      this.createPriceQuoteModel(priceQuote),
    );
  }
}
