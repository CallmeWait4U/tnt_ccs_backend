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

export class UpdateIndividualCustomerDTO {
  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ required: false, example: 'KH-22222', type: String })
  @IsOptional()
  @IsString()
  code: string;

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

  @ApiProperty({ required: false, example: new Date('01-01-1990'), type: Date })
  @IsOptional()
  @IsDateString()
  dayOfBirth: Date;

  @ApiProperty({
    required: false,
    example: '001082946357',
    type: String,
    maxLength: 12,
  })
  @IsOptional()
  @IsString()
  cccd: string;

  @ApiProperty({ required: false, example: Gender.MALE, enum: Gender })
  @IsOptional()
  @IsString()
  gender: Gender;

  @ApiProperty({ required: false, example: 'b@gmail.com', type: String })
  @IsOptional()
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
