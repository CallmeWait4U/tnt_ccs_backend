import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivityRespository } from 'src/activity/insfrastructure/activity.repository';
import {
  DeleteActivityCommand,
  DeleteAssignActivityCommand,
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
@CommandHandler(DeleteAssignActivityCommand)
export class DeleteAssignActivityHandler
  implements ICommandHandler<DeleteAssignActivityCommand, any>
{
  @Inject()
  private readonly activityRespository: ActivityRespository;

  async execute(command: DeleteAssignActivityCommand): Promise<void> {
    return await this.activityRespository.deleteAssignActivity(command);
  }
}
