import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PhaseRepository } from 'src/phase/infrastructure/phase.repository';
import { DeletePhaseCommand } from '../command/delete.phase.command';

@CommandHandler(DeletePhaseCommand)
export class DeletePhaseHandler
  implements ICommandHandler<DeletePhaseCommand, string[]>
{
  @Inject()
  private readonly phaseRepository: PhaseRepository;

  async execute(command: DeletePhaseCommand): Promise<string[]> {
    const models = await this.phaseRepository.getByUUIDs(command.uuid);
    return await this.phaseRepository.delete(models);
  }
}
