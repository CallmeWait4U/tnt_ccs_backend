import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
import { DeleteActivityComplaintCommand } from '../command/delete.activity.complaint.command';

@CommandHandler(DeleteActivityComplaintCommand)
export class DeleteActivityComplaintHandler
  implements ICommandHandler<DeleteActivityComplaintCommand, string[]>
{
  @Inject()
  private readonly complaintRepository: ComplaintRepository;
  @Inject()
  private readonly complaintDomain: ComplaintDomain;

  async execute(command: DeleteActivityComplaintCommand): Promise<string[]> {
    const models = await this.complaintRepository.getActivityComplaintUUIDs(
      command.uuid,
      command.tenantId,
    );
    this.complaintDomain.checkActivityComplaint(models);
    return await this.complaintRepository.deleteActivityComplaint(models);
  }
}
