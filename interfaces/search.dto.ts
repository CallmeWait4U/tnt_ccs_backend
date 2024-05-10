import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class SearchDTO {
  @ApiProperty({ type: Number, example: 0 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly offset: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly limit: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  @IsString()
  readonly searchModel?: string;
}
