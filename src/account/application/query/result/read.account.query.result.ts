import { IQueryResult } from '@nestjs/cqrs';
import { Gender } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ReadAccountResult implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  position: string;

  @Expose()
  dayOfBirth: Date;

  @Expose()
  gender: Gender;

  @Expose()
  nationality: string;

  @Expose()
  cccd: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email: string;

  @Expose()
  detailAddress: string;

  @Expose()
  district: string;

  @Expose()
  city: number;

  @Expose()
  description: string;
}
