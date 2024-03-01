import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReadAccountDTO {
  @ApiProperty({ type: String })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly uuid: string;
}
