import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceQuoteRepository } from 'src/priceQuote/infrastructure/priceQuote.repository';
import { DeletePriceQuoteCommand } from '../command/delete.priceQuote.command';

@CommandHandler(DeletePriceQuoteCommand)
export class DeletePriceQuoteHandler
  implements ICommandHandler<DeletePriceQuoteCommand, string[]>
{
  @Inject()
  private readonly priceQuoteRepository: PriceQuoteRepository;

  async execute(command: DeletePriceQuoteCommand): Promise<string[]> {
    const models = await this.priceQuoteRepository.getByUUIDs(command.uuid);
    return await this.priceQuoteRepository.delete(models);
  }
}
