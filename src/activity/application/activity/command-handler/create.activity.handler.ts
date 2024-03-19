import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivityDomain } from 'src/activity/domain/activity/activity.domain';
import { ActivityFactory } from 'src/activity/insfrastructure/activity/activity.factory';
import { ActivityRespository } from 'src/activity/insfrastructure/activity/activity.repository';
import { CreateActivityCommand } from '../command/create.activity.command';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
  implements ICommandHandler<CreateActivityCommand, string>
{
  @Inject()
  private readonly activityRespository: ActivityRespository;
  @Inject()
  private readonly activityFactory: ActivityFactory;
  @Inject()
  private readonly activityDomain: ActivityDomain;

  async execute(command: CreateActivityCommand): Promise<string> {
    const model = this.activityFactory.createActivityModel(command);
    const activity = await this.activityDomain.create(model);
    return await this.activityRespository.create(activity, command.phases);
  }
}
