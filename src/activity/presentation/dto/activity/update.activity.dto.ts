import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateActivityDTO {
  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  description: string | null;
}

export class UpdateTaskDTO {
  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  createDate: Date;

  @ApiProperty({ example: new Date(), type: Date })
  doneDate: Date;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  note: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsUUID()
  employeeUUID: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsUUID()
  activityUUID: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsUUID()
  customerUUID: string;
}
