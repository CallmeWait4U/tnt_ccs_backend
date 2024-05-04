import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ListChatEmployeeDTO {
  @ApiProperty({ type: String })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly employeeUUID: string;
}
