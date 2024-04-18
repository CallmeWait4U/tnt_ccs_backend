import { ICommand } from '@nestjs/cqrs';

class FieldComplaintProperties {
  name: string;
  isFieldFile: boolean;
  title: string;
  specificFileTypes?: string[];
  maxNumOfFiles?: number;
  listOptions?: string[];
}

export class CreateTypeComplaintCommand implements ICommand {
  name: string;
  description?: string;
  listOfField: FieldComplaintProperties[];
  tenantId: string;

  constructor(data: Partial<CreateTypeComplaintCommand>) {
    Object.assign(this, data);
  }
}
