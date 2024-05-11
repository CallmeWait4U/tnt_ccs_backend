import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceQuoteDomain } from 'src/priceQuote/domain/priceQuote.domain';
import { PriceQuoteRepository } from 'src/priceQuote/infrastructure/priceQuote.repository';
import { UpdatePriceQuoteCommand } from '../command/update.priceQuote.command';

@CommandHandler(UpdatePriceQuoteCommand)
export class UpdatePriceQuoteHandler
  implements ICommandHandler<UpdatePriceQuoteCommand, string>
{
  @Inject()
  private readonly priceQuoteRepository: PriceQuoteRepository;
  @Inject()
  private readonly priceQuoteDomain: PriceQuoteDomain;

  async execute(command: UpdatePriceQuoteCommand): Promise<string> {
    const modelCurrent = await this.priceQuoteRepository.getByUUID(
      command.uuid,
      command.tenantId,
    );
    const modelUpdated = this.priceQuoteDomain.update(modelCurrent, command);
    return await this.priceQuoteRepository.update(modelUpdated);
  }
}
