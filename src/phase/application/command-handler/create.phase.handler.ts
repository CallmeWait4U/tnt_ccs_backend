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
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTc0M2VmNTYtZWI0OS00ZWE3LWI5YjItOTJlMzYxYzM5MmQ5IiwidHlwZSI6IkFETUlOIiwidGVuYW50SWQiOiI4ODQyOTc2OS0xZDNkLTQ0YjUtODk2ZC1iNDdiMWM0MzQ3YmIiLCJpYXQiOjE3MTUxMTMzMDgsImV4cCI6MTcxNTE5OTcwOH0.MdSztIg-VWnuMAFS5fXesojXQSEqBN4--RwZFSMzqqg',
    // );

    return await this.phaseRepository.create(phase);
  }
}
