import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityDTO {
  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 'String', type: String })
  @IsOptional()
  @IsString()
  description: string;
}
