import { Phase, Prisma } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { PhaseModel } from '../domain/phase.model';

type PhaseEntity = Prisma.PhaseGetPayload<{}>;

export class PhaseFactory extends BaseFactory {
  createPhaseModel(phase: PhaseEntity | Phase | Partial<Phase> | null) {
    if (!phase) return null;

    return this.createModel(PhaseModel, {
      ...phase,
    });
  }

  createPhaseModels(phases: PhaseEntity[] | Phase[] | Partial<Phase>[] | null) {
    if (!phases) return null;
    return phases.map((phase) => this.createPhaseModel(phase));
  }
}
