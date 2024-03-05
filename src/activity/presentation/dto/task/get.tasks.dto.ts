import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SearchDTO } from 'interfaces/search.dto';

export class GetTasksDTO extends SearchDTO {
  @ApiProperty({ example: 'activityUUID', type: String })
  @IsNotEmpty()
  @IsString()
  activityUUID: string;
}
