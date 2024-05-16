import { ICommand } from '@nestjs/cqrs';

export class SendPriceQuoteRequestCommand implements ICommand {
  constructor(
    readonly uuid: string,
    readonly tenantId: string,
  ) {}
}
