import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskDomain } from 'src/activity/domain/task/task.domain';
import { TaskFactory } from 'src/activity/insfrastructure/task/task.factory';
import { TaskRepository } from 'src/activity/insfrastructure/task/task.repository';
import { CreateAutoTaskCommand } from '../command/create.auto.task.command';

@CommandHandler(CreateAutoTaskCommand)
export class CreateAutoTaskHandler
  implements ICommandHandler<CreateAutoTaskCommand, string>
{
  @Inject()
  private readonly taskRespository: TaskRepository;
  @Inject()
  private readonly taskFactory: TaskFactory;
  @Inject()
  private readonly taskDomain: TaskDomain;

  async execute(command: CreateAutoTaskCommand): Promise<string> {
    const model = this.taskFactory.createTaskModel(command);
    const task = this.taskDomain.createAutoTask(
      model,
      command.employees.map((employee) => ({ uuid: employee })),
    );
    return await this.taskRespository.createAutoTask(task);
  }
}
