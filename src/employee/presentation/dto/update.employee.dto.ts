import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateEmployeeDTO {
  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  code: string | null;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  city: number | null;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  district: string | null;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  detailAddress: string | null;

  @ApiProperty({ example: 'String', type: String })
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  description: string | null;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  gender: boolean;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  position: string | null;

  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  nationality: string | null;
}
