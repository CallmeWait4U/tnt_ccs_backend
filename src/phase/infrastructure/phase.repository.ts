import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { PhaseModel } from '../domain/phase.model';
import { PhaseFactory } from './phase.factory';

export class PhaseRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly phaseFactory: PhaseFactory;

  async create(phase: PhaseModel): Promise<string> {
    const { ...data } = phase;
    await this.prisma.phase.create({ data });
    return phase.uuid;
  }

  async update(phase: PhaseModel): Promise<string> {
    const { uuid, ...data } = phase;
    await this.prisma.phase.update({ data, where: { uuid } });
    return uuid;
  }

  async delete(models: PhaseModel[]): Promise<string[]> {
    const uuids = models.map((model) => model.uuid);
    await this.prisma.phase.deleteMany({ where: { uuid: { in: uuids } } });
    return uuids;
  }

  async getByUUID(uuid: string): Promise<PhaseModel> {
    const entity = await this.prisma.phase.findUnique({
      where: { uuid },
    });
    return this.phaseFactory.createPhaseModel(entity);
  }

  async getByUUIDs(uuids: string[] | string): Promise<PhaseModel[]> {
    const entities = await this.prisma.phase.findMany({
      where: { uuid: { in: Array.isArray(uuids) ? uuids : [uuids] } },
    });
    return this.phaseFactory.createPhaseModels(entities);
  }

  async count(): Promise<number> {
    return await this.prisma.phase.count();
  }
}