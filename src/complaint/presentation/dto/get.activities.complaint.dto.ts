import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetActivitiesComplaintDTO {
  @ApiProperty({ example: 'complaintUUID', type: String })
  @IsNotEmpty()
  @IsString()
  complaintUUID: string;
}
