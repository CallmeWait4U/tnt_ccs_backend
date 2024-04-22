import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivityDomain } from 'src/activity/domain/activity/activity.domain';
import { ActivityRespository } from 'src/activity/insfrastructure/activity/activity.repository';
import { DeleteActivityCommand } from '../command/delete.activity.command';

@CommandHandler(DeleteActivityCommand)
export class DeleteEpmloyeeHandler
  implements ICommandHandler<DeleteActivityCommand, string[]>
{
  @Inject()
  private readonly activityRespository: ActivityRespository;
  @Inject()
  private readonly activityDomain: ActivityDomain;

  async execute(command: DeleteActivityCommand): Promise<string[]> {
    const models = await this.activityRespository.getByUUIDs(
      command.uuid,
      command.tenantId,
    );
    this.activityDomain.checkActivity(models);
    return await this.activityRespository.delete(models);
  }
}
