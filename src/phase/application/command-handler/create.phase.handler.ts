import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
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

  constructor(private readonly amqpService: AmqpConnection) {}

  async execute(command: CreatePhaseCommand): Promise<string> {
    const model = this.phaseFactory.createPhaseModel(command);

    const phase = await this.phaseDomain.create(model);
    // this.amqpService.publish(
    //   'exchange1',
    //   'notification.auto.sending',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMWYwYTVmMzgtNmRiMi00YmI4LTgzZDctZTg5MzI3OTI2OWM1IiwidHlwZSI6IkFETUlOIiwidGVuYW50SWQiOiIyZTdlNGJkMS04OGRhLTQ3ZjctODQzMC1kNmRlNTRkODhlYjgiLCJpYXQiOjE3MTA2MDE1NjQsImV4cCI6MTcxMDY4Nzk2NH0.kA1P9gIhenwzmDjRmrfpnF16efRzLl-MHh5W0DHi0xI',
    // );

    const uuid = await this.phaseRepository.create(phase);
    return uuid;
  }
}
