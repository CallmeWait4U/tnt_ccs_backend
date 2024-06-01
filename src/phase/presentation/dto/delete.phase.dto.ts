import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePhaseDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly uuid: string;
}
