import { ICommand } from '@nestjs/cqrs';

export class DeletePriceQuoteCommand implements ICommand {
  uuid: string;
  tenantId: string;
  constructor(readonly data: Partial<DeletePriceQuoteCommand>) {
    Object.assign(this, data);
  }
}
