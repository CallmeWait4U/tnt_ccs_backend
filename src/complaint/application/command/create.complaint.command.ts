import { ICommand } from '@nestjs/cqrs';
import { StatusComplaint } from '@prisma/client';

class ValueProperties {
  fieldComplaintUUID: string;
  value: string[];
}

export class CreateComplaintCommand implements ICommand {
  status: StatusComplaint;
  sentDate: Date;
  customerUUID: string;
  typeComplaintUUID: string;
  billUUID: string;
  valueFieldComplaint: ValueProperties[];
  images: Express.Multer.File[];
  tenantId: string;

  constructor(data: Partial<CreateComplaintCommand>) {
    Object.assign(this, data);
  }
}
