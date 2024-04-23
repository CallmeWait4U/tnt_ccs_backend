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

export class ReadTypeComplaintResult implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  numOfComplaints: number;

  @Expose()
  listOfField: Field[];
}
