import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateActivityDTO {
  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  description: string | null;
}

export class UpdateAssignActivityDTO {
  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsDate()
  createDate: Date;

  @ApiProperty({ example: new Date(), type: Date })
  @IsDate()
  doneDate?: Date;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsDate()
  status: number;

  @ApiProperty({ example: 'String', type: String })
  @IsString()
  note: string;
}
