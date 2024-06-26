import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PhaseDomain } from 'src/phase/domain/phase.domain';
import { PhaseQuery } from 'src/phase/infrastructure/phase.query';
import { PhaseRepository } from 'src/phase/infrastructure/phase.repository';
import { UpdatePhaseCommand } from '../command/update.phase.command';

@CommandHandler(UpdatePhaseCommand)
export class UpdatePhaseHandler
  implements ICommandHandler<UpdatePhaseCommand, string>
{
  @Inject()
  private readonly phaseRepository: PhaseRepository;
  @Inject()
  private readonly phaseDomain: PhaseDomain;
  @Inject()
  private readonly phaseQuery: PhaseQuery;

  async execute(command: UpdatePhaseCommand): Promise<string> {
    const modelCurrent = await this.phaseRepository.getByUUID(command.uuid);
    this.phaseDomain.checkPhase(modelCurrent);
    const listPhaseCurrent = await this.phaseQuery.getListForCheck(
      command.tenantId,
    );
    const modelUpdated = this.phaseDomain.update(
      modelCurrent,
      command,
      listPhaseCurrent,
    );
    return await this.phaseRepository.update(modelUpdated);
  }
}
