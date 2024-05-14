import { ApiProperty } from '@nestjs/swagger';
import { Gender, StatusCustomerAccount } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBusinessCustomerDTO {
  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ required: false, example: 1, type: Number })
  @IsOptional()
  @IsNumber()
  source: number;

  @ApiProperty({ required: false, example: 'TP Ha Noi', type: String })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ required: false, example: 'Quận 10', type: String })
  @IsOptional()
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

  @ApiProperty({ required: false, example: 'phaseUUID', type: String })
  @IsOptional()
  @IsString()
  phaseUUID: string;

  @ApiProperty({ required: false, example: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  receiveMail: boolean;

  @ApiProperty({
    required: false,
    example: 'Khách hàng thích ăn cá',
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    required: false,
    example: StatusCustomerAccount.PENDING,
    enum: StatusCustomerAccount,
  })
  @IsOptional()
  @IsString()
  hasAccount: StatusCustomerAccount;

  @ApiProperty({
    required: false,
    example: 'Công ty Bất động sản 1TV',
    type: String,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 'Việt Nam', type: String })
  @IsOptional()
  @IsString()
  businessNationality: string;

  @ApiProperty({
    required: false,
    example: '0309829579',
    type: String,
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  registrationNumber: string;

  @ApiProperty({
    required: false,
    example: '0301458121-001',
    type: String,
    maxLength: 14,
  })
  @IsOptional()
  @IsString()
  taxCode: string;

  @ApiProperty({ required: false, example: 'Bất động sản', type: String })
  @IsOptional()
  @IsString()
  industry: string;

  @ApiProperty({ required: false, example: 'Nguyễn Văn A', type: String })
  @IsOptional()
  @IsString()
  representativeName: string;

  @ApiProperty({ required: false, example: new Date('01-01-1990'), type: Date })
  @IsOptional()
  @IsDateString()
  representativeDayOfBirth: Date;

  @ApiProperty({
    required: false,
    example: '001082946357',
    type: String,
    maxLength: 12,
  })
  @IsOptional()
  @IsString()
  representativeCccd: string;

  @ApiProperty({ required: false, example: 'Trưởng phòng', type: String })
  @IsOptional()
  @IsString()
  representativePosition: string;

  @ApiProperty({ required: false, example: Gender.MALE, enum: Gender })
  @IsOptional()
  @IsString()
  representativeGender: Gender;

  @ApiProperty({ required: false, example: '0907529892', type: String })
  @IsOptional()
  @IsString()
  representativePhone: string;

  @ApiProperty({ required: false, example: 'a@gmail.com', type: String })
  @IsOptional()
  @IsString()
  representativeEmail: string;

  @ApiProperty({ required: false, example: 'Việt Nam', type: String })
  @IsOptional()
  @IsString()
  representativeNationality: string;
}
