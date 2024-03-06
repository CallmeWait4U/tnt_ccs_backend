import { Expose } from 'class-transformer';
import { TaskModel } from '../task/task.model';

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
}
