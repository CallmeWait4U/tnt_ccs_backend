import { ICommand } from '@nestjs/cqrs';

export class DeleteProductCommand implements ICommand {
  uuid: string;
  constructor(readonly data: Partial<DeleteProductCommand>) {
    Object.assign(this, data);
  }
}
