import { v4 as uuidv4 } from 'uuid';
import { PhaseModel } from './phase.model';

export class PhaseDomain {
  async create(model: PhaseModel): Promise<PhaseModel> {
    const phaseUUID = uuidv4().toString();
    model.uuid = phaseUUID;
    return model;
  }

  update(
    phaseCurrent: PhaseModel,
    phaseUpdate: Partial<PhaseModel>,
  ): PhaseModel {
    for (const [prop, value] of Object.entries(phaseCurrent)) {
      phaseCurrent[prop] = phaseUpdate[prop] ? phaseUpdate[prop] : value;
    }
    return phaseCurrent;
  }
}
