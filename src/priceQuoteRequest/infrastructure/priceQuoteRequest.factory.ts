import { PriceQuoteRequest } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { PriceQuoteRequestModel } from '../domain/priceQuoteRequest.model';

export class PriceQuoteRequestFactory extends BaseFactory {
  createPriceQuoteRequestModel(
    priceQuoteRequest: PriceQuoteRequest | Partial<PriceQuoteRequest> | null,
  ) {
    if (!priceQuoteRequest) return null;

    return this.createModel(PriceQuoteRequestModel, {
      ...priceQuoteRequest,
    });
  }

  createPriceQuoteRequestModels(
    priceQuoteRequests:
      | PriceQuoteRequest[]
      | Partial<PriceQuoteRequest>[]
      | null,
  ) {
    if (!priceQuoteRequests) return null;
    return priceQuoteRequests.map((priceQuoteRequest) =>
      this.createPriceQuoteRequestModel(priceQuoteRequest),
    );
  }
}
