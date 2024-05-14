import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintFactory } from 'src/complaint/infrastructure/complaint.factory';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
import { CreateActivityComplaintCommand } from '../command/create.activity.complaint.command';

@CommandHandler(CreateActivityComplaintCommand)
export class CreateActivityComplaintHandler
  implements ICommandHandler<CreateActivityComplaintCommand, string>
{
  @Inject()
  private readonly complaintFactory: ComplaintFactory;
  @Inject()
  private readonly complaintRepository: ComplaintRepository;
  @Inject()
  private readonly complaintDomain: ComplaintDomain;

  async execute(command: CreateActivityComplaintCommand): Promise<string> {
    const model = this.complaintFactory.createActivityComplaintModel(command);
    const activityComplaint =
      this.complaintDomain.createActivityComplaint(model);
    return await this.complaintRepository.createActivityComplaint(
      activityComplaint,
    );
  }
}
