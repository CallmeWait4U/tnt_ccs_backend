import { ICommand } from '@nestjs/cqrs';

export class SendMessageToEmployeeCommand implements ICommand {
  constructor(
    public readonly senderUUID: string,
    public readonly receiverUUID: string,
    public readonly content: string,
  ) {}
}
