import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskDomain } from 'src/activity/domain/task/task.domain';
import { TaskFactory } from 'src/activity/insfrastructure/task/task.factory';
import { TaskRepository } from 'src/activity/insfrastructure/task/task.repository';
import { CreateTaskCommand } from '../command/create.task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler
  implements ICommandHandler<CreateTaskCommand, string>
{
  @Inject()
  private readonly taskRespository: TaskRepository;
  @Inject()
  private readonly taskFactory: TaskFactory;
  @Inject()
  private readonly taskDomain: TaskDomain;

  async execute(command: CreateTaskCommand): Promise<string> {
    const model = this.taskFactory.createTaskModel(command);
    const task = await this.taskDomain.create(model);
    if (typeof task === 'string') return task;
    return await this.taskRespository.create(task);
  }
}
