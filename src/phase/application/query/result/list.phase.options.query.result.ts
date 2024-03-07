import { Expose } from 'class-transformer';

export class PhaseOptionItem {
  @Expose()
  uuid: string;

  @Expose()
  name: string;
}

export class ListPhaseOptionsResult {
  @Expose()
  items: PhaseOptionItem[];

  @Expose()
  total: number;
}
