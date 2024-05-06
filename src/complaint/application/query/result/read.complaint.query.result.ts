import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class Field {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  isFieldFile: boolean;

  @Expose()
  title: string;

  @Expose()
  specificFileTypes: string[];

  @Expose()
  maxNumOfFiles: number;

  @Expose()
  listOptions: string[];
}

export class ValueField {
  @Expose()
  fieldComplaintUUID: string;

  @Expose()
  value: string[];
}

export class ReadComplaintResult implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  code: string;

  @Expose()
  status: string;

  @Expose()
  sentDate: string;

  @Expose()
  billUUID: string;

  @Expose()
  customerUUID: string;

  @Expose()
  customerName: string;

  @Expose()
  customerCCCD: string;

  @Expose()
  customerPhoneNumber: string;

  @Expose()
  customerEmail: string;

  @Expose()
  isBusiness: boolean;

  @Expose()
  listOfField: Field[];

  @Expose()
  valueFieldComplaint: ValueField[];
}
