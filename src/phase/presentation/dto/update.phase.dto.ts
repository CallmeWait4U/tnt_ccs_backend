import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePhaseDTO {
  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ example: 'Nguyễn Văn A', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @ApiProperty({
    required: false,
    example: 'string',
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;
}
