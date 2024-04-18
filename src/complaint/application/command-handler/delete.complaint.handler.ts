import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
import { DeleteComplaintCommand } from '../command/delete.complaint.command';

@CommandHandler(DeleteComplaintCommand)
export class DeleteComplaintHandler
  implements ICommandHandler<DeleteComplaintCommand, string[]>
{
  @Inject()
  private readonly complaintRepository: ComplaintRepository;
  @Inject()
  private readonly complaintDomain: ComplaintDomain;

  async execute(command: DeleteComplaintCommand): Promise<string[]> {
    const models = await this.complaintRepository.getComplaintByUUIDs(
      command.uuids,
      command.tenantId,
    );
    this.complaintDomain.checkComplaint(models);
    return await this.complaintRepository.deleteComplaint(models);
  }
}
