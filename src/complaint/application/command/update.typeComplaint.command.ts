import { ICommand } from '@nestjs/cqrs';

class FieldComplaintProperties {
  name: string;
  isFieldFile: boolean;
  title: string;
  specificFileTypes?: string[];
  maxNumOfFiles?: number;
  listOptions?: string[];
}

export class UpdateTypeComplaintCommand implements ICommand {
  uuid: string;
  name?: string;
  description?: string;
  listOfField: FieldComplaintProperties[];
  tenantId: string;

  constructor(data: Partial<UpdateTypeComplaintCommand>) {
    Object.assign(this, data);
  }
}
