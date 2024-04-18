import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComplaintDomain } from 'src/complaint/domain/complaint.domain';
import { ComplaintFactory } from 'src/complaint/infrastructure/complaint.factory';
import { ComplaintRepository } from 'src/complaint/infrastructure/complaint.repository';
import { CreateTypeComplaintCommand } from '../command/create.typeComplaint.command';

@CommandHandler(CreateTypeComplaintCommand)
export class CreateTypeComplaintHandler
  implements ICommandHandler<CreateTypeComplaintCommand, string>
{
  @Inject()
  private readonly complaintFactory: ComplaintFactory;
  @Inject()
  private readonly complaintRepository: ComplaintRepository;
  @Inject()
  private readonly complaintDomain: ComplaintDomain;

  async execute(command: CreateTypeComplaintCommand): Promise<string> {
    const model = this.complaintFactory.createTypeComplaintModel(command);
    const typeComplaint = this.complaintDomain.createTypeComplaint(model);
    return await this.complaintRepository.createTypeComplaint(typeComplaint);
  }
}
