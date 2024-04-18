import { ApiProperty } from '@nestjs/swagger';
import { StatusComplaint } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusComplaintDTO {
  @ApiProperty({ example: 'complaintUUID', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ example: StatusComplaint.PROCESSING, enum: StatusComplaint })
  @IsNotEmpty()
  @IsString()
  status: StatusComplaint;
}
