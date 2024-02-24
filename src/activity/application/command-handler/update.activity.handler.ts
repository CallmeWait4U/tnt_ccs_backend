import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivityRespository } from 'src/activity/insfrastructure/activity.repository';
import {
  UpdateActivityCommand,
  UpdateAssignActivityCommand,
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

@CommandHandler(UpdateAssignActivityCommand)
export class UpdateAssignActivityHandler
  implements ICommandHandler<UpdateAssignActivityCommand, any>
{
  @Inject()
  private readonly activityRespository: ActivityRespository;

  async execute(command: UpdateAssignActivityCommand): Promise<void> {
    return await this.activityRespository.updateAssignActivity(command);
  }
}
