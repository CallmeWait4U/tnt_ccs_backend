import { ApiProperty } from '@nestjs/swagger';
import { Gender, StatusCustomerAccount } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBusinessCustomerDTO {
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

  @ApiProperty({
    example: StatusCustomerAccount.NOTAPPROVED,
    enum: StatusCustomerAccount,
  })
  @IsNotEmpty()
  @IsString()
  hasAccount: StatusCustomerAccount;

  @ApiProperty({ example: 'phaseUUID', type: String })
  @IsNotEmpty()
  @IsString()
  phaseUUID: string;

  @ApiProperty({ example: 'Công ty Bất động sản 1TV', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 'Việt Nam', type: String })
  @IsOptional()
  @IsString()
  businessNationality: string;

  @ApiProperty({ example: '0309829579', type: String, maxLength: 10 })
  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @ApiProperty({ example: '0301458121-001', type: String, maxLength: 14 })
  @IsNotEmpty()
  @IsString()
  taxCode: string;

  @ApiProperty({ required: false, example: 'Bất động sản', type: String })
  @IsOptional()
  @IsString()
  industry: string;

  @ApiProperty({ example: 'Nguyễn Văn A', type: String })
  @IsNotEmpty()
  @IsString()
  representativeName: string;

  @ApiProperty({ example: new Date('01-01-1990'), type: Date })
  @IsNotEmpty()
  @IsDateString()
  representativeDayOfBirth: Date;

  @ApiProperty({ example: '001082946357', type: String, maxLength: 12 })
  @IsNotEmpty()
  @IsString()
  representativeCccd: string;

  @ApiProperty({ required: false, example: 'Trưởng phòng', type: String })
  @IsOptional()
  @IsString()
  representativePosition: string;

  @ApiProperty({ example: Gender.MALE, enum: Gender })
  @IsNotEmpty()
  @IsString()
  representativeGender: Gender;

  @ApiProperty({ required: false, example: '0907529892', type: String })
  @IsOptional()
  @IsString()
  representativePhone: string;

  @ApiProperty({ example: 'a@gmail.com', type: String })
  @IsNotEmpty()
  @IsString()
  representativeEmail: string;

  @ApiProperty({ required: false, example: 'Việt Nam', type: String })
  @IsOptional()
  @IsString()
  representativeNationality: string;

  @ApiProperty({
    example: ['4s45sd4f562sad54f', '545dsaxcsrg54y1hr87fd'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  // @IsNotEmpty()
  employeeUUIDs: string[];
}
