import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteActivityDTO {
  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;
}
