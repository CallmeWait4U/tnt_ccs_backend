import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintFactory } from 'src/complaint/infrastructure/complaint.factory';
import { ComplaintQuery } from 'src/complaint/infrastructure/complaint.query';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
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
    return await this.complaintRepository.createComplaint(complaint);
  }
}
