import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceQuoteRequestDomain } from 'src/priceQuoteRequest/domain/priceQuoteRequest.domain';
import { PriceQuoteRequestRepository } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.repository';
import { UpdatePriceQuoteRequestCommand } from '../command/update.priceQuoteRequest.command';

@CommandHandler(UpdatePriceQuoteRequestCommand)
export class UpdatePriceQuoteRequestHandler
  implements ICommandHandler<UpdatePriceQuoteRequestCommand, string>
{
  @Inject()
  private readonly priceQuoteRequestRepository: PriceQuoteRequestRepository;
  @Inject()
  private readonly priceQuoteRequestDomain: PriceQuoteRequestDomain;

  async execute(command: UpdatePriceQuoteRequestCommand): Promise<string> {
    const modelCurrent = await this.priceQuoteRequestRepository.getByUUID(
      command.uuid,
    );
    const modelUpdated = this.priceQuoteRequestDomain.update(
      modelCurrent,
      command,
    );
    return await this.priceQuoteRequestRepository.update(modelUpdated);
  }
}
