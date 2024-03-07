import { ICommand } from '@nestjs/cqrs';

export class DeletePriceQuoteRequestCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeletePriceQuoteRequestCommand>) {
    Object.assign(this, data);
  }
}
