import { v4 as uuidv4 } from 'uuid';
import { PriceQuoteModel } from './priceQuote.model';

export class PriceQuoteDomain {
  async create(model: PriceQuoteModel): Promise<PriceQuoteModel> {
    model.uuid = uuidv4().toString();
    return model;
  }

  update(
    priceQuoteCurrent: PriceQuoteModel,
    priceQuoteUpdate: Partial<PriceQuoteModel>,
  ): PriceQuoteModel {
    for (const [prop, value] of Object.entries(priceQuoteCurrent)) {
      priceQuoteCurrent[prop] = priceQuoteUpdate[prop]
        ? priceQuoteUpdate[prop]
        : value;
    }
    return priceQuoteCurrent;
  }
}
