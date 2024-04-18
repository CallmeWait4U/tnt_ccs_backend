import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
import { DeleteTypeComplaintCommand } from '../command/delete.typeComplaint.command';

@CommandHandler(DeleteTypeComplaintCommand)
export class DeleteTypeComplaintHandler
  implements ICommandHandler<DeleteTypeComplaintCommand, string[]>
{
  @Inject()
  private readonly complaintRepository: ComplaintRepository;
  @Inject()
  private readonly complaintDomain: ComplaintDomain;

  async execute(command: DeleteTypeComplaintCommand): Promise<string[]> {
    const models = await this.complaintRepository.getTypeComplaintByUUIDs(
      command.uuid,
      command.tenantId,
    );
    this.complaintDomain.checkTypeComplaint(models);
    return await this.complaintRepository.deleteTypeComplaint(models);
  }
}
