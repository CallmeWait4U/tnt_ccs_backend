import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskDomain } from 'src/activity/domain/task/task.domain';
import { TaskRepository } from 'src/activity/insfrastructure/task/task.repository';
import { UpdateStatusTaskCommand } from '../command/update.status.task.command';

@CommandHandler(UpdateStatusTaskCommand)
export class UpdateStatusTaskHandler
  implements ICommandHandler<UpdateStatusTaskCommand, string>
{
  @Inject()
  private readonly taskRepository: TaskRepository;
  @Inject()
  private readonly taskDomain: TaskDomain;

  async execute(command: UpdateStatusTaskCommand): Promise<string> {
    const model = await this.taskRepository.getByUUID(
      command.uuid,
      command.tenantId,
    );
    this.taskDomain.checkTask(model);
    this.taskDomain.updateStatus(model);
    return await this.taskRepository.updateStatus(model);
  }
}
