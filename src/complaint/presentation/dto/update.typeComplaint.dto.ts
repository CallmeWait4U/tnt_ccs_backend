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

class UpdateFieldComplaintProperties {
  @ApiProperty({ example: 'fieldUUID', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ example: 'Trả lời dài', type: String })
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

  @ApiProperty({
    required: false,
    example: ['.pdf', '.doc', '.docx'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specificFileTypes?: string[];

  @ApiProperty({ required: false, example: 2, type: Number })
  @IsNotEmpty()
  @IsOptional()
  maxNumOfFiles?: number;

  @ApiProperty({ required: false, example: [], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  listOptions?: string[];
}

export class UpdateTypeComplaintDTO {
  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ example: 'Vận chuyển', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 'Vận chuyển', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [UpdateFieldComplaintProperties] })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateFieldComplaintProperties)
  listOfField: UpdateFieldComplaintProperties[];
}
