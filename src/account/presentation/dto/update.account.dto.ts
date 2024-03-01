import { ApiProperty } from '@nestjs/swagger';
import { Gender, TypeAccount } from '@prisma/client';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAccountDTO {
  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ required: false, example: 'Nguyễn Văn A', type: String })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 'NV-00001', type: String })
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty({ required: false, example: 'Nhân viên CSKH', type: String })
  @IsOptional()
  @IsString()
  position: string;

  @ApiProperty({ required: false, example: new Date('01-01-1998'), type: Date })
  @IsOptional()
  @IsDateString()
  dayOfBirth: Date;

  @ApiProperty({ required: false, example: Gender.MALE, enum: Gender })
  @IsOptional()
  @IsString()
  gender: Gender;

  @ApiProperty({ required: false, example: 'Việt Nam', type: String })
  @IsOptional()
  @IsString()
  nationality: string;

  @ApiProperty({
    required: false,
    example: '001082946357',
    type: String,
    maxLength: 12,
  })
  @IsOptional()
  @IsString()
  cccd: string;

  @ApiProperty({ required: false, example: '0907529892', type: String })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ required: false, example: 'a@gmail.com', type: String })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ required: false, example: 1, type: Number })
  @IsOptional()
  @IsNumber()
  city: number;

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

  @ApiProperty({
    required: false,
    example: 'Nhân viên hay đi trễ',
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    required: false,
    example: TypeAccount.EMPLOYEE,
    enum: TypeAccount,
  })
  @IsOptional()
  @IsString()
  type: TypeAccount;
}
