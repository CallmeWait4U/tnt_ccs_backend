import { Expose } from 'class-transformer';
// import { PhaseModel } from 'src/phase/domain/phase.model';
import { TaskModel } from '../task/task.model';

export class PhaseType {
  @Expose()
  uuid: string;
}

export class ActivityModel {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  tasks: TaskModel[];

  @Expose()
  phases: string[];
  
}
