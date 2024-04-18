import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class FieldComplaintProperties {
  @ApiProperty({ example: 'Trả lời ngắn', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  isFieldFile: boolean;

  @ApiProperty({ example: 'Bạn hãy mô tả cụ thể hơn', type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: ['.pdf', '.doc', '.docx'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specificFileTypes?: string[];

  @ApiProperty({ example: 2, type: Number })
  @IsNotEmpty()
  @IsOptional()
  maxNumOfFiles?: number;

  @ApiProperty({ example: [], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  listOptions?: string[];
}

export class CreateTypeComplaintDTO {
  @ApiProperty({ example: 'Vận chuyển', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Vận chuyển', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [FieldComplaintProperties] })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FieldComplaintProperties)
  listOfField: FieldComplaintProperties[];
}
