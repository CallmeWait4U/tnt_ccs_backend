import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTypeComplaintDTO {
  @ApiProperty({ example: 'complaintUUID', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;
}
