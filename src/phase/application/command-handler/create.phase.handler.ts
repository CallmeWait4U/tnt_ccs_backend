import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PhaseDomain } from 'src/phase/domain/phase.domain';
import { PhaseFactory } from 'src/phase/infrastructure/phase.factory';
import { PhaseRepository } from 'src/phase/infrastructure/phase.repository';
import { CreatePhaseCommand } from '../command/create.phase.command';

@CommandHandler(CreatePhaseCommand)
export class CreatePhaseHandler
  implements ICommandHandler<CreatePhaseCommand, string>
{
  @Inject()
  private readonly phaseRepository: PhaseRepository;
  @Inject()
  private readonly phaseFactory: PhaseFactory;
  @Inject()
  private readonly phaseDomain: PhaseDomain;

  async execute(command: CreatePhaseCommand): Promise<any> {
    const model = this.phaseFactory.createPhaseModel(command);

    const phase = await this.phaseDomain.create(model);

    return await this.phaseRepository.create(phase);
  }
}
