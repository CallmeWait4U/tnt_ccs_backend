import { StatusComplaint } from '@prisma/client';
import { Expose } from 'class-transformer';

export class EmployeeType {
  @Expose()
  uuid: string;
  @Expose()
  name: string;
  @Expose()
  code: string;
}

export class ActivityType {
  @Expose()
  uuid: string;
  @Expose()
  name: string;
}

export class HistoryStatusComplaintType {
  @Expose()
  id: number;
  @Expose()
  date: Date;
  @Expose()
  status: StatusComplaint;
  @Expose()
  complaintUUID: string;
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
  isFieldFile: boolean;
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
  listStatus: HistoryStatusComplaintType[];
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

export class ActivityComplaintModel {
  @Expose()
  id: number;
  @Expose()
  uuid: string;
  @Expose()
  note: string;
  @Expose()
  doneDate: Date;
  @Expose()
  employeeUUID: string;
  @Expose()
  employee: EmployeeType;
  @Expose()
  activityUUID: string;
  @Expose()
  complaintUUID: string;
  @Expose()
  complaint: ComplaintModel;
  @Expose()
  tenantId: string;
}
