import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignUpDTO {
  @ApiProperty({ example: 'Công ty A', type: String })
  @IsString()
  @IsNotEmpty()
  tenantName: string;

  @ApiProperty({ example: '0301458121-001', type: String, maxLength: 14 })
  @IsNotEmpty()
  @IsString()
  taxCode: string;

  @ApiProperty({ example: '0309829579', type: String, maxLength: 10 })
  @IsNotEmpty()
  @IsString()
  businessRegistrationNumber: string;

  @ApiProperty({ required: false, example: 'Việt Nam', type: String })
  @IsOptional()
  @IsString()
  businessNationality: string;

  @ApiProperty({ required: false, example: 'Bất động sản', type: String })
  @IsOptional()
  @IsString()
  businessIndustry: string;

  @ApiProperty({ example: '0907529892', type: String })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'a@gmail.com', type: String })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '246 Lý Thường Kiệt', type: String })
  @IsNotEmpty()
  @IsString()
  addressDetail: string;

  @ApiProperty({ example: 'Quận 10', type: String })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ example: 'TP HCM', type: String })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: 'Việt Nam', type: String })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'congtya', type: String })
  @IsNotEmpty()
  @IsString()
  domain: string;

  @ApiProperty({ example: 'Nguyễn Văn B', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: new Date('01-01-1998'), type: Date })
  @IsOptional()
  @IsDateString()
  dayOfBirth: Date;

  @ApiProperty({ example: '001082946357', type: String, maxLength: 12 })
  @IsNotEmpty()
  @IsString()
  cccd: string;

  @ApiProperty({ example: 'user', type: String })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456', type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '123456', type: String })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}
