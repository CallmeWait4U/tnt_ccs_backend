import { ApiProperty } from '@nestjs/swagger';
import { Gender, TypeAccount } from '@prisma/client';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAccountDTO {
  @ApiProperty({ example: 'Nguyễn Văn A', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'NV-00001', type: String })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'Nhân viên CSKH', type: String })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ example: new Date('01-01-1998'), type: Date })
  @IsNotEmpty()
  @IsDateString()
  dayOfBirth: Date;

  @ApiProperty({ example: Gender.MALE, enum: Gender })
  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @ApiProperty({ required: false, example: 'Việt Nam', type: String })
  @IsOptional()
  @IsString()
  nationality: string;

  @ApiProperty({ example: '001082946357', type: String, maxLength: 12 })
  @IsNotEmpty()
  @IsString()
  cccd: string;

  @ApiProperty({ required: false, example: '0907529892', type: String })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'a@gmail.com', type: String })
  @IsNotEmpty()
  @IsString()
  email: string;

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
    example: 'Nhân viên hay đi trễ',
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: TypeAccount.EMPLOYEE, enum: TypeAccount })
  @IsNotEmpty()
  @IsString()
  type: TypeAccount;
}
