import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class TestDTO {
  @ApiProperty({ example: 50, type: Number })
  @IsNotEmpty()
  @Type(() => Number)
  numCus: number;
}
