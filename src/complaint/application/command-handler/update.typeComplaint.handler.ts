import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
import { UpdateTypeComplaintCommand } from '../command/update.typeComplaint.command';

@CommandHandler(UpdateTypeComplaintCommand)
export class UpdateTypeComplaintHandler
  implements ICommandHandler<UpdateTypeComplaintCommand, string>
{
  @Inject()
  private readonly complaintRepository: ComplaintRepository;
  @Inject()
  private readonly complaintDomain: ComplaintDomain;

  async execute(command: UpdateTypeComplaintCommand): Promise<string> {
    const modelCurrent = await this.complaintRepository.getTypeComplaintByUUIDs(
      command.uuid,
      command.tenantId,
    );
    this.complaintDomain.checkTypeComplaint(modelCurrent);
    const modelUpdated = this.complaintDomain.updateTypeComplaint(
      modelCurrent[0],
      command,
    );
    return await this.complaintRepository.updateTypeComplaint(modelUpdated);
  }
}
