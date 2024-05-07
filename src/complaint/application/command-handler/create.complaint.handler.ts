import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintFactory } from 'src/complaint/infrastructure/complaint.factory';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
import { CreateNotificationDTO } from 'src/notification/presentation/dto/create.notification.dto';
import { CreateComplaintCommand } from '../command/create.complaint.command';

@CommandHandler(CreateComplaintCommand)
export class CreateComplaintHandler
  implements ICommandHandler<CreateComplaintCommand, string>
{
  @Inject()
  private readonly complaintFactory: ComplaintFactory;
  @Inject()
  private readonly complaintRepository: ComplaintRepository;
  @Inject()
  private readonly complaintQuery: ComplaintQuery;
  @Inject()
  private readonly complaintDomain: ComplaintDomain;

  constructor(private readonly amqpService: AmqpConnection) {}

  async execute(command: CreateComplaintCommand): Promise<string> {
    const model = this.complaintFactory.createComplaintModel(command);
    const listEmployees = await this.complaintQuery.getListEmployees(
      command.customerUUID,
    );
    const typeComplaint = await this.complaintQuery.getTypeComplaint(
      command.typeComplaintUUID,
      command.tenantId,
    );
    const complaint = await this.complaintDomain.createComplaint(
      model,
      listEmployees,
      typeComplaint,
      command.images,
    );
    const accounts = await this.complaintQuery.getAccountForEmployee(
      listEmployees.map((employee) => employee.uuid),
    );
    if (accounts.length > 0) {
      const payload: CreateNotificationDTO = {
        title: 'Khiếu nại mới ' + complaint.uuid,
        content: 'Bạn được phân công giải quyết 1 khiếu nại mới.',
        time: new Date(),
        accountUUIDs: accounts.map((account) => account.accountUUID),
        tokens: accounts.map((account) => account.token),
        tenantId: command.tenantId,
      };
      this.amqpService.publish('exchange1', 'notify.conplaint', payload);
    }
    return await this.complaintRepository.createComplaint(complaint);
  }
}
