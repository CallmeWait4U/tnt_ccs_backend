import { ICommand } from '@nestjs/cqrs';

class ValueProperties {
  fieldComplaintUUID: string;
  value: string[];
}

export class CreateComplaintCommand implements ICommand {
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
