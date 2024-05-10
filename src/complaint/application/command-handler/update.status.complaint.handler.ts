import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
import { UpdateStatusComplaintCommand } from '../command/update.status.complaint.command';

@CommandHandler(UpdateStatusComplaintCommand)
export class UpdateStatusComplaintHandler
  implements ICommandHandler<UpdateStatusComplaintCommand, string>
{
  @Inject()
  private readonly complaintRepository: ComplaintRepository;
  @Inject()
  private readonly complaintDomain: ComplaintDomain;

  async execute(command: UpdateStatusComplaintCommand): Promise<string> {
    const modelCurrent = await this.complaintRepository.getComplaintByUUIDs(
      command.uuid,
      command.tenantId,
    );
    this.complaintDomain.checkComplaint(modelCurrent);
    const historyStatusComplaint = this.complaintDomain.updateStatusComplaint(
      command.status,
    );
    return await this.complaintRepository.updateStatusComplaint(
      modelCurrent[0],
      historyStatusComplaint,
    );
  }
}
