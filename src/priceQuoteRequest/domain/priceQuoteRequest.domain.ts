import { faker } from '@faker-js/faker/locale/vi';
import { v4 as uuidv4 } from 'uuid';
import { PriceQuoteRequestModel } from './priceQuoteRequest.model';

export class PriceQuoteRequestDomain {
  async create(model: PriceQuoteRequestModel): Promise<PriceQuoteRequestModel> {
    model.uuid = uuidv4().toString();
    model.code = 'YCBG-' + faker.string.numeric(5);
    return model;
  }

  update(
    priceQuoteRequestCurrent: PriceQuoteRequestModel,
    priceQuoteRequestUpdate: Partial<PriceQuoteRequestModel>,
  ): PriceQuoteRequestModel {
    for (const [prop, value] of Object.entries(priceQuoteRequestCurrent)) {
      priceQuoteRequestCurrent[prop] = priceQuoteRequestUpdate[prop]
        ? priceQuoteRequestUpdate[prop]
        : value;
    }
    return priceQuoteRequestCurrent;
  }
}
