import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceQuoteDomain } from 'src/priceQuote/domain/priceQuote.domain';
import { PriceQuoteFactory } from 'src/priceQuote/infrastructure/priceQuote.factory';
import { PriceQuoteRepository } from 'src/priceQuote/infrastructure/priceQuote.repository';
import { CreatePriceQuoteCommand } from '../command/create.priceQuote.command';

@CommandHandler(CreatePriceQuoteCommand)
export class CreatePriceQuoteHandler
  implements ICommandHandler<CreatePriceQuoteCommand, string>
{
  @Inject()
  private readonly priceQuoteRepository: PriceQuoteRepository;
  @Inject()
  private readonly priceQuoteFactory: PriceQuoteFactory;
  @Inject()
  private readonly priceQuoteDomain: PriceQuoteDomain;

  async execute(command: CreatePriceQuoteCommand): Promise<string> {
    const id = (await this.priceQuoteRepository.count()) + 1;
    const model = this.priceQuoteFactory.createPriceQuoteModel(command);

    const priceQuote = await this.priceQuoteDomain.create(id, model);

    return await this.priceQuoteRepository.create(priceQuote);
  }
}
