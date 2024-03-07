import { ICommand } from '@nestjs/cqrs';

export class UpdatePhaseCommand implements ICommand {
  uuid: string;
  name: string;
  priority: number;
  description: string;

  constructor(data: Partial<UpdatePhaseCommand>) {
    Object.assign(this, data);
  }
}
