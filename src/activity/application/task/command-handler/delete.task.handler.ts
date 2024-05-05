import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskDomain } from 'src/activity/domain/task/task.domain';
import { TaskRepository } from 'src/activity/insfrastructure/task/task.repository';
import { DeleteTaskCommand } from '../command/delete.task.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler
  implements ICommandHandler<DeleteTaskCommand, any>
{
  @Inject()
  private readonly taskRespository: TaskRepository;
  @Inject()
  private readonly taskDomain: TaskDomain;

  async execute(command: DeleteTaskCommand): Promise<string[]> {
    const models = await this.taskRespository.getByUUIDs(
      command.uuid,
      command.tenantId,
    );
    this.taskDomain.checkTask(models);
    return await this.taskRespository.delete(models);
  }
}
