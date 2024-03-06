import { ICommand } from '@nestjs/cqrs';

export class DeleteProductCommand implements ICommand {
  constructor(readonly uuid: string) {}
}
