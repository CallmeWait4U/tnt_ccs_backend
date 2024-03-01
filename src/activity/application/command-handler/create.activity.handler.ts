import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ActivityRespository,
  TaskRespository,
} from 'src/activity/insfrastructure/activity.repository';
import {
  CreateActivityCommand,
  CreateTaskCommand,
} from '../command/create.activity.command';
@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
  implements ICommandHandler<CreateActivityCommand, any>
{
  @Inject()
  private readonly activityRespository: ActivityRespository;

  async execute(command: CreateActivityCommand): Promise<any> {
    return await this.activityRespository.createActivity(command);
  }
}

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler
  implements ICommandHandler<CreateTaskCommand, any>
{
  @Inject()
  private readonly taskRespository: TaskRespository;

  async execute(command: CreateTaskCommand): Promise<any> {
    return await this.taskRespository.createTask(command);
  }
}
