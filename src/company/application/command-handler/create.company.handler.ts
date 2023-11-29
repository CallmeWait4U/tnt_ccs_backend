import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../command/create.company.command';

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyHandler
  implements ICommandHandler<CreateCompanyCommand>
{
  async execute(command: CreateCompanyCommand): Promise<void> {
    console.log(command);
  }
}
