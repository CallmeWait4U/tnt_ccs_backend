import { HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PhaseRepository } from '../infrastructure/phase.repository';
import { PhaseModel } from './phase.model';

export class PhaseDomain {
  private readonly phaseRepository: PhaseRepository;
  async create(model: PhaseModel): Promise<PhaseModel> {
    const listPhaseName = await this.phaseRepository.getListCurrent();
    if (listPhaseName.map((item) => item.name).includes(model.name)) {
      throw new HttpException('Phase name already exists', 400);
    }
    const phaseUUID = uuidv4().toString();
    model.uuid = phaseUUID;
    return model;
  }

  update(
    phaseCurrent: PhaseModel,
    phaseUpdate: Partial<PhaseModel>,
    listPhaseCurrent: any[],
  ): PhaseModel {
    listPhaseCurrent.forEach((item) => {
      if (
        item.name.toUpperCase() === phaseUpdate.name.toUpperCase() &&
        item.uuid !== phaseCurrent.uuid
      ) {
        throw new HttpException('Phase name already exists', 400);
      }
    });
    for (const [prop, value] of Object.entries(phaseCurrent)) {
      phaseCurrent[prop] = phaseUpdate[prop] ? phaseUpdate[prop] : value;
    }
    return phaseCurrent;
  }
}
