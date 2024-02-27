import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ActivityRespository,
  TaskRespository,
} from 'src/activity/insfrastructure/activity.repository';
import {
  UpdateActivityCommand,
  UpdateTaskCommand,
} from '../command/update.activity.command';

@CommandHandler(UpdateActivityCommand)
export class UpdateActivityHandler
  implements ICommandHandler<UpdateActivityCommand, any>
{
  @Inject()
  private readonly activityRespository: ActivityRespository;

  async execute(command: UpdateActivityCommand): Promise<void> {
    return await this.activityRespository.updateActivity(command);
  }
}

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler
  implements ICommandHandler<UpdateTaskCommand, any>
{
  @Inject()
  private readonly taskRespository: TaskRespository;

  async execute(command: UpdateTaskCommand): Promise<void> {
    return await this.taskRespository.updateTask(command);
  }
}
