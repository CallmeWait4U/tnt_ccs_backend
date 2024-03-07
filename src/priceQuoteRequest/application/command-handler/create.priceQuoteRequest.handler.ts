import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceQuoteRequestDomain } from 'src/priceQuoteRequest/domain/priceQuoteRequest.domain';
import { PriceQuoteRequestFactory } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.factory';
import { PriceQuoteRequestRepository } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.repository';
import { CreatePriceQuoteRequestCommand } from '../command/create.priceQuoteRequest.command';

@CommandHandler(CreatePriceQuoteRequestCommand)
export class CreatePriceQuoteRequestHandler
  implements ICommandHandler<CreatePriceQuoteRequestCommand, string>
{
  @Inject()
  private readonly priceQuoteRequestRepository: PriceQuoteRequestRepository;
  @Inject()
  private readonly priceQuoteRequestFactory: PriceQuoteRequestFactory;
  @Inject()
  private readonly priceQuoteRequestDomain: PriceQuoteRequestDomain;

  async execute(command: CreatePriceQuoteRequestCommand): Promise<string> {
    const model =
      this.priceQuoteRequestFactory.createPriceQuoteRequestModel(command);
    const priceQuoteRequest = await this.priceQuoteRequestDomain.create(model);

    return await this.priceQuoteRequestRepository.create(priceQuoteRequest);
  }
}
