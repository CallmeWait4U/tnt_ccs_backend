import { ICommand } from '@nestjs/cqrs';
import { StatusComplaint } from '@prisma/client';

export class UpdateStatusComplaintCommand implements ICommand {
  uuid: string;
  status: StatusComplaint;
  tenantId: string;

  constructor(data: Partial<UpdateStatusComplaintCommand>) {
    Object.assign(this, data);
  }
}
