import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEmployeeDTO {
  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  code: string;

  @ApiProperty({ example: 1, type: Number })
  @IsNumberString()
  @IsNotEmpty()
  city: number;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  district: string | null;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  detailAddress: string | null;

  @ApiProperty({ example: 'example@gmail.com', type: String })
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  description: string | null;

  @ApiProperty({ example: 1, type: Number })
  @IsNumberString()
  @IsNotEmpty()
  gender: number;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  position: string | null;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  isChangeImage: boolean;

  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  @IsOptional()
  avatar: Express.Multer.File;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  nationality: string | null;
}
