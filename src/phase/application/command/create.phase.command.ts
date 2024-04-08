import { ICommand } from '@nestjs/cqrs';

export class CreatePhaseCommand implements ICommand {
  name: string;
  priority: number;
  description: string;
  tenantId: string;

  constructor(data: Partial<CreatePhaseCommand>) {
    Object.assign(this, data);
  }
}
