import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivityRespository } from 'src/activity/insfrastructure/activity.repository';
import { CreateActivityCommand } from '../command/create.activity.command';
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
