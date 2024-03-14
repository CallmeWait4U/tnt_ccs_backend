import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { PhaseModel } from '../domain/phase.model';
import { PhaseFactory } from './phase.factory';

export class PhaseRepository {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly phaseFactory: PhaseFactory;

  async create(phase: PhaseModel): Promise<any> {
    const listPhase = await this.prisma.phase.findMany({
      orderBy: { priority: 'asc' },
    });

    listPhase.forEach((item) => {
      if (item.name.toUpperCase() === phase.name.toUpperCase()) {
        throw new HttpException(
          'Phase name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    try {
      this.prisma.$transaction(async (transactionClient) => {
        let priority = phase.priority;
        await Promise.all(
          listPhase.map(async (item) => {
            if (item.priority === priority) {
              const newPriority = priority + 1;
              await transactionClient.phase.update({
                where: { uuid: item.uuid },
                data: { priority: newPriority },
              });
              priority = newPriority;
            }
          }),
        );

        await transactionClient.phase.create({ data: phase });
        return { uuid: phase.uuid };
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(phase: PhaseModel): Promise<any> {
    const { uuid, ...data } = phase;
    const listPhase = await this.prisma.phase.findMany({
      orderBy: { priority: 'asc' },
    });

    listPhase.forEach((item) => {
      if (item.name.toUpperCase() === phase.name.toUpperCase()) {
        throw new HttpException(
          'Phase name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    try {
      this.prisma.$transaction(async (transactionClient) => {
        let priority = phase.priority;
        await Promise.all(
          listPhase.map(async (item) => {
            if (item.priority === priority) {
              const newPriority = priority + 1;
              await transactionClient.phase.update({
                where: { uuid: item.uuid },
                data: { priority: newPriority },
              });
              priority = newPriority;
            }
          }),
        );

        await transactionClient.phase.update({ data, where: { uuid } });
        return { uuid: uuid };
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
