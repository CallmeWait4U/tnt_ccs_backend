import { ApiProperty } from '@nestjs/swagger';
import { StatusComplaint } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class ValueProperties {
  @ApiProperty({ example: 'fieldUUID', type: String })
  @IsNotEmpty()
  @IsString()
  fieldComplaintUUID: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  value: string[];
}

export class CreateComplaintDTO {
  @ApiProperty({
    example: StatusComplaint.PENDING,
    enum: StatusComplaint,
  })
  @IsNotEmpty()
  @IsString()
  status: StatusComplaint;

  @ApiProperty({ example: 'typeComplaintUUID', type: String })
  @IsNotEmpty()
  @IsString()
  typeComplaintUUID: string;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsDateString()
  sentDate: Date;

  @ApiProperty({ example: 'billUUID', type: String })
  @IsNotEmpty()
  @IsString()
  billUUID: string;

  @ApiProperty({ example: 'customerUUID', type: String })
  @IsNotEmpty()
  @IsString()
  customerUUID: string;

  @ApiProperty({ type: [ValueProperties] })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ValueProperties)
  valueFieldComplaint: ValueProperties[];
}
