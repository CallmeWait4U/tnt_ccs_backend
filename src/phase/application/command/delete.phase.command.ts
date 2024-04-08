import { ICommand } from '@nestjs/cqrs';

export class DeletePhaseCommand implements ICommand {
  uuids: string[];
  tenantId: string;
  constructor(readonly data: Partial<DeletePhaseCommand>) {
    Object.assign(this, data);
  }
}
