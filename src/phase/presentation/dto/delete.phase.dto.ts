import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DeletePhaseDTO {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly uuids: string[];
}
