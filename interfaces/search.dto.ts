import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class SearchDTO {
  @ApiProperty({ type: Number, example: 0 })
  @IsNotEmpty()
  @IsNumber()
  readonly offset: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsNotEmpty()
  @IsNumber()
  readonly limit: number;

  @ApiProperty({ required: false, type: String, example: '' })
  @IsOptional()
  @IsString()
  readonly searchModel?: string;
}
