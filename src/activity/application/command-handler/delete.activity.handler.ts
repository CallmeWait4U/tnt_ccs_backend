import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ActivityRespository,
  TaskRespository,
} from 'src/activity/insfrastructure/activity.repository';
import {
  DeleteActivityCommand,
  DeleteTaskCommand,
} from '../command/delete.activity.command';

@CommandHandler(DeleteActivityCommand)
export class DeleteEpmloyeeHandler
  implements ICommandHandler<DeleteActivityCommand, any>
{
  @Inject()
  private readonly activityRespository: ActivityRespository;

  async execute(command: DeleteActivityCommand): Promise<void> {
    return await this.activityRespository.deleteActivity(command);
  }
}
@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler
  implements ICommandHandler<DeleteTaskCommand, any>
{
  @Inject()
  private readonly taskRespository: TaskRespository;

  async execute(command: DeleteTaskCommand): Promise<void> {
    return await this.taskRespository.deleteTask(command);
  }
}
