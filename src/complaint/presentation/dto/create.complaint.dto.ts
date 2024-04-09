import { ApiProperty } from '@nestjs/swagger';
import { StatusComplaint } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateComplaintDTO {
  @ApiProperty({
    example: StatusComplaint.PENDING,
    enum: StatusComplaint,
  })
  @IsNotEmpty()
  @IsString()
  status: StatusComplaint;

  @ApiProperty({ example: 'typeComplaintUUID', type: String })
  @IsNotEmpty()
  @IsString()
  typeComplaintUUID: string;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsDateString()
  sentDate: string;

  //   @ApiProperty()
}
