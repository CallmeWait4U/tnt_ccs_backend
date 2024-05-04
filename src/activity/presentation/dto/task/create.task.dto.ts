import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  createDate: Date;

  @ApiProperty({ required: false, example: 'String', type: String })
  @IsOptional()
  @IsString()
  note: string;

  @ApiProperty({ example: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  autoAnnounceCus: boolean;

  @ApiProperty({ example: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  autoAnnounceEmp: boolean;

  @ApiProperty({ example: ['String'], type: [String] })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  employees: string[];

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  activityUUID: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  customerUUID: string;
}
