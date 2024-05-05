import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityDTO {
  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 'String', type: String })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    required: false,
    example: ['uuid1', 'uuid2', 'uuid3'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  phases?: string[];
}
