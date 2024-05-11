import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MailerDTO } from 'interfaces/mailer.dto';
import { EmailService } from 'libs/email.module';
import { TaskDomain } from 'src/activity/domain/task/task.domain';
import { TaskFactory } from 'src/activity/insfrastructure/task/task.factory';
import { TaskQuery } from 'src/activity/insfrastructure/task/task.query';
import { TaskRepository } from 'src/activity/insfrastructure/task/task.repository';
import { SendEmailTaskCommand } from '../command/send.email.task.command';

@CommandHandler(SendEmailTaskCommand)
export class SendEmailTaskHandler
  implements ICommandHandler<SendEmailTaskCommand, void>
{
  @Inject()
  private readonly emailService: EmailService;
  @Inject()
  private readonly taskQuery: TaskQuery;
  @Inject()
  private readonly taskRepository: TaskRepository;
  @Inject()
  private readonly taskFactory: TaskFactory;
  @Inject()
  private readonly taskDomain: TaskDomain;

  async execute(command: SendEmailTaskCommand): Promise<void> {
    const employee = await this.taskQuery.getInfoEmployee(
      command.employeeUUID,
      command.tenantId,
    );
    const customer = await this.taskQuery.getInfoCustomer(
      command.taskUUID,
      command.tenantId,
    );
    const mailerDto: MailerDTO = {
      from: { name: employee.name, address: 'tnt.ccs.system@gmail.com' },
      recipients: [
        {
          name: customer.name,
          address: customer.isBusiness
            ? customer.business.representativeEmail
            : customer.individual.email,
        },
      ],
      subject: command.subject,
      html: command.content,
      attachments: command.files,
    };
    await this.emailService.sendEmail(mailerDto);
    const model = this.taskFactory.createEmailTaskModel(command);
    const emailTask = this.taskDomain.createEmailTask(model);
    await this.taskRepository.createEmailTask(emailTask);
  }
}
