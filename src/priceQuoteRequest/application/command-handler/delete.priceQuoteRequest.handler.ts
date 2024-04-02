import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceQuoteRequestRepository } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.repository';
import { DeletePriceQuoteRequestCommand } from '../command/delete.priceQuoteRequest.command';

@CommandHandler(DeletePriceQuoteRequestCommand)
export class DeletePriceQuoteRequestHandler
  implements ICommandHandler<DeletePriceQuoteRequestCommand, string[]>
{
  @Inject()
  private readonly priceQuoteRequestRepository: PriceQuoteRequestRepository;

  async execute(command: DeletePriceQuoteRequestCommand): Promise<string[]> {
    const models = await this.priceQuoteRequestRepository.getByUUIDs(
      command.uuid,
    );
    return await this.priceQuoteRequestRepository.delete(models);
  }
}
