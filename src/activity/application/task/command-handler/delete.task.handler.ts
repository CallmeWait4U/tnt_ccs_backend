import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/activity/insfrastructure/task/task.repository';
import { DeleteTaskCommand } from '../command/delete.task.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler
  implements ICommandHandler<DeleteTaskCommand, any>
{
  @Inject()
  private readonly taskRespository: TaskRepository;

  async execute(command: DeleteTaskCommand): Promise<string[]> {
    const models = await this.taskRespository.getByUUIDs(command.uuid);
    return await this.taskRespository.delete(models);
  }
}
