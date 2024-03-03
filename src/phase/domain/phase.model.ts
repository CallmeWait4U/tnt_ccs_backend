import { Expose } from 'class-transformer';

export class PhaseModel {
  @Expose()
  uuid: string;
  @Expose()
  name: string;
  @Expose()
  priority: number;
  @Expose()
  description: string;
}
