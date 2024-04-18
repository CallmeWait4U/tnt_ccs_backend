import { StatusComplaint } from '@prisma/client';
import { Expose } from 'class-transformer';

export class EmployeeType {
  @Expose()
  uuid: string;
}

export class FieldComplaintModel {
  @Expose()
  id?: number;
  @Expose()
  uuid?: string;
  @Expose()
  name: string;
  @Expose()
  isFieldFile: boolean;
  @Expose()
  title: string;
  @Expose()
  specificFileTypes?: string[];
  @Expose()
  maxNumOfFiles?: number;
  @Expose()
  listOptions?: string[];
  @Expose()
  typeComplaintUUID?: string;
}

export class ValueFieldComplaintModel {
  @Expose()
  id: number;
  @Expose()
  fieldComplaintUUID: string;
  @Expose()
  value: string[];
  @Expose()
  complaintUUID: string;
  @Expose()
  tenantId: string;
}

export class ComplaintModel {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  code: string;
  @Expose()
  status: StatusComplaint;
  @Expose()
  employees: EmployeeType[];
  @Expose()
  createdDate: Date;
  @Expose()
  sentDate: Date;
  @Expose()
  customerUUID: string;
  @Expose()
  typeComplaintUUID: string;
  @Expose()
  billUUID: string;
  @Expose()
  valueFieldComplaint: Partial<ValueFieldComplaintModel>[];
  @Expose()
  tenantId: string;
}

export class TypeComplaintModel {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  listOfField: FieldComplaintModel[];
  @Expose()
  complaints?: ComplaintModel[];
  @Expose()
  tenantId: string;
}
