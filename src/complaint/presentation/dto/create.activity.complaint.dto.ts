import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityComplaintDTO {
  @ApiProperty({ example: 'employeeUUID', type: String })
  @IsNotEmpty()
  @IsString()
  employeeUUID: string;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsDateString()
  doneDate: Date;

  @ApiProperty({ example: 'activityUUID', type: String })
  @IsNotEmpty()
  @IsString()
  activityUUID: string;

  @ApiProperty({ example: 'Đây là ghi chú', type: String })
  @IsNotEmpty()
  @IsString()
  note: string;

  @ApiProperty({ example: 'complaintUUID', type: String })
  @IsNotEmpty()
  @IsString()
  complaintUUID: string;
}
