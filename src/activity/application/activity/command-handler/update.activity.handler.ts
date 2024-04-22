import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivityDomain } from 'src/activity/domain/activity/activity.domain';
import { ActivityRespository } from 'src/activity/insfrastructure/activity/activity.repository';
import { UpdateActivityCommand } from '../command/update.activity.command';

@CommandHandler(UpdateActivityCommand)
export class UpdateActivityHandler
  implements ICommandHandler<UpdateActivityCommand, string>
{
  @Inject()
  private readonly activityRespository: ActivityRespository;
  @Inject()
  private readonly activityDomain: ActivityDomain;

  async execute(command: UpdateActivityCommand): Promise<string> {
    const modelCurrent = await this.activityRespository.getByUUID(
      command.uuid,
      command.tenantId,
    );
    this.activityDomain.checkActivity(modelCurrent);
    const modelUpdated = this.activityDomain.update(modelCurrent, command);
    return await this.activityRespository.update(modelUpdated);
  }
}
