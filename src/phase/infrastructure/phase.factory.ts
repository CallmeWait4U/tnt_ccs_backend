import { Phase, Prisma } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { CustomerType, EmployeeType, PhaseModel } from '../domain/phase.model';

type PhaseEntity = Prisma.PhaseGetPayload<{
  include: {
    customer: true;
    employee: true;
  };
}>;

export class PhaseFactory extends BaseFactory {
  createPhaseModel(phase: PhaseEntity | Phase | Partial<Phase> | null) {
    if (!phase) return null;
    let customer = {};
    let employee = {};
    if (phase.type === 'CUSTOMER') {
      customer = this.createModel(CustomerType, { ...phase });
    } else {
      employee = this.createModel(EmployeeType, { ...phase });
    }
    return this.createModel(PhaseModel, {
      ...phase,
      customer: 'customer' in phase ? phase.customer : customer,
      employee: 'employee' in phase ? phase.employee : employee,
    });
  }

  createPhaseModels(phases: PhaseEntity[] | Phase[] | Partial<Phase>[] | null) {
    if (!phases) return null;
    return phases.map((phase) => this.createPhaseModel(phase));
  }
}
