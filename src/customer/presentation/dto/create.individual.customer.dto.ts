import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIndividualCustomerDTO {
  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  isBusiness: boolean;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  source: number;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  city: number;

  @ApiProperty({ example: 'Quận 10', type: String })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({
    required: false,
    example: '246, Lý Thường Kiệt',
    type: String,
  })
  @IsOptional()
  @IsString()
  detailAddress: string;

  @ApiProperty({
    required: false,
    example: 'Khách hàng thích ăn cá',
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsDateString()
  createdDate: Date;

  @ApiProperty({ example: false, type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  hasAccount: boolean;

  @ApiProperty({ example: 'Nguyễn Văn B', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: new Date('01-01-1990'), type: Date })
  @IsNotEmpty()
  @IsDateString()
  dayOfBirth: Date;

  @ApiProperty({ example: '001082946357', type: String, maxLength: 12 })
  @IsNotEmpty()
  @IsString()
  cccd: string;

  @ApiProperty({ example: Gender.MALE, enum: Gender })
  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @ApiProperty({ example: 'b@gmail.com', type: String })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: false, example: '0907529898', type: String })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ required: false, example: 'Việt Nam', type: String })
  @IsOptional()
  @IsString()
  nationality: string;
}